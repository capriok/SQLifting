/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state/state'

const useAssembleActions = () => {
	const [{
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
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				steps: stepSet[active.entity],
				activeStep: 0,
				build: {}
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
			if (build.hasOwnProperty(steps[activeStep].label.toLowerCase())) {
				bool = true
			} else {
				bool = false
			}
		}
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
		console.log(active);
		console.log(build);
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
