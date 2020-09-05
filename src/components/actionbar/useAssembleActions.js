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
			{ name: 'Equipment', label: 'Choose Equipment', entity: equipments },
			{ name: 'Muscles', label: 'Choose Muscle', entity: muscles },
			{ name: 'Exercise', label: 'Choose Exercise', entity: exercises },
			{ name: 'Review', label: 'Review', entity: [] }
		],
		circs: [
			{ name: 'Movements', label: 'Choose Movements', entity: movements },
			{ name: 'Review', label: 'Review', entity: [] }
		],
		wocos: [
			{ name: 'Exercises', label: 'Choose Exercises', entity: excos },
			{ name: 'Circuits', label: 'Choose Circuits', entity: circs },
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
				activeStep: val
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

	const addToBuild = (entity) => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				build: {
					...build,
					[activeEntities[0].table]: entity
				}
			}
		})
	}

	return {
		fullReset,
		resetSteps,
		setSteps,
		setActiveStep,
		setActiveEntities,
		addToBuild,
	}
}

export default useAssembleActions
