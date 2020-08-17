/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'

const useActionBarActions = () => {
	const [{ actionState }, dispatch] = useStateValue()

	const resetActionBarStates = () => {
		dispatch({ type: 'ACTIONSTATE_RESET' })
	}

	const enableAction = (prop) => {
		if (!prop) return
		let initial = {}
		Object.keys(actionState).forEach((key) => initial[key] = {
			...actionState[key],
			state: false
		})
		dispatch({
			type: 'ACTIONSTATE_ACTION',
			actionState: {
				...initial,
				[prop]: {
					...actionState[prop],
					state: !actionState[prop].state
				}
			}
		})
	}

	const setEditEntity = (type, payload) => {
		dispatch({
			type: 'ACTIONSTATE_ACTION',
			actionState: {
				...actionState,
				[type]: payload
			}
		})
	}

	return { resetActionBarStates, enableAction, setEditEntity }
}

export default useActionBarActions
