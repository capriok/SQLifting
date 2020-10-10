/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state/state'
import useUpdate from '../../utils/useUpdate'

const useAssembleActions = () => {
	const [{
		user: { details: { uid } },
		compositions: {
			equipments,
			muscles,
			exercises,
			movements
		},
		composites: {
			excos,
			circs
		},
		assemble,
		assemble: {
			steps,
			activeStep,
			build
		}
	}, dispatch] = useStateValue()

	let entities = window.location.pathname.split('/')[3]

	const update = useUpdate()

	const stepSet = {
		exercises: [
			{ name: 'Equipment', label: 'Equipment', entity: equipments },
			{ name: 'Muscles', label: 'Muscle', entity: muscles },
			{ name: 'Exercise', label: 'Exercise', entity: exercises }
		],
		circuits: [
			{ name: 'Movements', label: 'Movements', entity: movements },
			{ name: 'Detail', label: 'Detail', entity: [] }
		],
		workouts: [
			{ name: 'Exercises', label: 'Exercises', entity: excos },
			{ name: 'Circuits', label: 'Circuits', entity: circs },
			{ name: 'Detail', label: 'Detail', entity: [] }
		]
	}

	const fullReset = () => {
		dispatch({ type: 'RESET_ASSEMBLE' })
	}

	const resetSteps = () => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeStep: 0
			}
		})
	}

	const setSteps = () => {
		let buildProps
		switch (entities) {
			case 'exercises':
				buildProps = {
					equipment: {},
					muscle: {},
					exercise: {},
				}
				break;
			case 'circuits':
				buildProps = {
					movements: []
				}
				break;
			case 'workouts':
				buildProps = {
					exercises: [],
					circuits: []
				}
				break;
			default:
				buildProps = {}
				break;
		}
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				steps: stepSet[entities],
				activeStep: 0,
				build: buildProps
			}
		})
	}

	const incStep = () => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeStep: activeStep + 1,
				readyForNext: false
			}
		})
	}

	const decStep = () => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeStep: activeStep - 1,
				readyForNext: true
			}
		})
	}

	const setActiveEntities = () => {
		let bool
		if (steps.length > 0) {
			let current = steps[activeStep].label.toLowerCase()
			switch (entities) {
				case 'exercises':
					Object.keys(build[current]).length > 0
						? bool = true
						: bool = false
					break;
				case 'circuits':
					build.movements.length > 0 || current === 'detail'
						? bool = true
						: bool = false
					break;
				case 'workouts':
					(build.hasOwnProperty(current) && build[current].length > 0)
						|| current === 'detail'
						|| current === 'circuits'
						? bool = true
						: bool = false
					break;
				default:
					break;
			}
		}
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeEntities: stepSet[entities][activeStep].entity,
				readyForNext: bool
			}
		})
	}

	const submitBuild = () => {
		console.log('%cSubmitted Build', 'color: lightskyblue;', build);
		let table
		switch (entities) {
			case 'exercises':
				table = 'excos'
				break;
			case 'circuits':
				table = 'circs'
				break;
			case 'workouts':
				table = 'wocos'
				break;
			default:
				break;
		}
		SQLifting.post(table, { build, uid })
			.then(res => {
				update('composites', [entities])
				console.log('%cSuccessfully inserted', 'color: lightskyblue;');
			})
			.catch(err => console.log(err))
	}

	return {
		fullReset,
		resetSteps,
		setSteps,
		incStep,
		decStep,
		setActiveEntities,
		submitBuild
	}
}

export default useAssembleActions
