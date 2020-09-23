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
			active,
			steps,
			activeStep,
			build
		}
	}, dispatch] = useStateValue()

	const update = useUpdate()

	const stepSet = {
		excos: [
			{ name: 'Equipment', label: 'Equipment', entity: equipments },
			{ name: 'Muscles', label: 'Muscle', entity: muscles },
			{ name: 'Exercise', label: 'Exercise', entity: exercises }
		],
		circs: [
			{ name: 'Movements', label: 'Movements', entity: movements },
			{ name: 'Detail', label: 'Detail', entity: [] }
		],
		wocos: [
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
		switch (active.entity) {
			case 'excos':
				buildProps = {
					equipment: {},
					muscle: {},
					exercise: {},
				}
				break;
			case 'circs':
				buildProps = {
					movements: []
				}
				break;
			case 'wocos':
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
				steps: stepSet[active.entity],
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
			switch (active.entity) {
				case 'excos':
					Object.keys(build[current]).length > 0
						? bool = true
						: bool = false
					break;
				case 'circs':
					build.movements.length > 0 || current === 'detail'
						? bool = true
						: bool = false
					break;
				case 'wocos':
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
		// (build.hasOwnProperty(steps[activeStep].label.toLowerCase())
		// 	&& (build[steps[activeStep].label.toLowerCase()].length > 0
		// 		|| Object.keys(build[steps[activeStep].label.toLowerCase()]).length > 0))
		// 	|| steps[activeStep].label.toLowerCase() === 'detail'
		// 	|| (active.entity === 'wocos' && activeStep === 1)

		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeEntities: stepSet[active.entity][activeStep].entity,
				readyForNext: bool
			}
		})
	}

	const submitBuild = () => {
		console.log('%cSubmitted Build', 'color: lightskyblue;', build);
		switch (active.entity) {
			case 'excos':
				SQLifting.post('post/exco', { uid, build })
					.then(res => {
						update('composites', ['excos'])
						console.log('%cSuccessfully inserted', 'color: lightskyblue;');
					})
					.catch(err => console.log(err))
				break;
			case 'circs':
				SQLifting.post('post/circ', { uid, build })
					.then(res => {
						update('composites', ['circs'])
						console.log('%cSuccessfully inserted', 'color: lightskyblue;');
					})
					.catch(err => console.log(err))
				break;
			case 'wocos':
				SQLifting.post('post/woco', { uid, build })
					.then(res => {
						update('composites', ['wocos'])
						console.log('%cSuccessfully inserted', 'color: lightskyblue;');
					})
					.catch(err => console.log(err))
				break;
			default:
				console.log('Something went wrong');
				break;
		}
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
