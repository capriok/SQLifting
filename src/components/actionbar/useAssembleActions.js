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
			steps,
			active,
			activeStep,
			activeEntities,
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
			{ name: 'Review', label: 'Review', entity: [] }
		],
		wocos: [
			{ name: 'Exercises', label: 'Exercises', entity: excos },
			{ name: 'Circuits', label: 'Circuits', entity: circs },
			{ name: 'Review', label: 'Review', entity: [] }
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

	const setActiveStep = (val) => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeStep: val,
				readyForNext: false
			}
		})
	}

	const setActiveEntities = () => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeEntities: stepSet[active.entity][activeStep].entity
			}
		})
	}

	const submitBuild = (val) => {
		console.log(build);
	}

	return {
		fullReset,
		resetSteps,
		setSteps,
		setActiveStep,
		setActiveEntities,
		submitBuild
	}
}

export default useAssembleActions
