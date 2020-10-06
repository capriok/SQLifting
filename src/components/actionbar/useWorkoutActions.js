/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../../state/state'

const useWorkoutActions = () => {
	const [{
		composites: {
			wocos
		},
		workout,
		workout: {
			preview
		}
	}, dispatch] = useStateValue()

	const fullReset = () => {
		dispatch({ type: 'RESET_WORKOUT' })
	}

	const setPreview = (entity) => {
		// Unset preview if entity is already active
		if (preview.entity && preview.entity.id === entity.id) {
			return dispatch({
				type: 'WORKOUT_ACTION',
				workout: {
					...workout,
					preview: {}
				}
			})
		}
		// Inject selected entity
		dispatch({
			type: 'WORKOUT_ACTION',
			workout: {
				...workout,
				preview: {
					entity: entity
				}
			}
		})
	}

	const setPrepare = (entity) => {
		dispatch({
			type: 'WORKOUT_ACTION',
			workout: {
				...workout,
				prepare: entity
			}
		})
	}


	return {
		fullReset,
		setPreview,
		setPrepare
	}
}

export default useWorkoutActions
