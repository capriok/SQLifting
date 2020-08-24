/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'

import { isEmpty } from 'lodash'

const useManagerActions = () => {
	const [{
		manager,
		manager: {
			preview,
			editor,
			selector,
			selector: {
				selection
			}
		}
	}, dispatch] = useStateValue()

	const fullReset = () => {
		dispatch({ type: 'RESET_MANAGER' })
	}

	const enableEditor = () => {
		console.log(manager);
		if (isEmpty(preview.entity)) return
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				editor: {
					...preview,
					state: !editor.state
				}
			}
		})

		// if (!prop) return
		// let initial = {}
		// Object.keys(actionState).forEach((key) => initial[key] = {
		// 	...actionState[key],
		// 	state: false
		// })
		// dispatch({
		// 	type: 'ACTIONSTATE_ACTION',
		// 	actionState: {
		// 		...initial,
		// 		[prop]: {
		// 			...actionState[prop],
		// 			state: !actionState[prop].state
		// 		}
		// 	}
		// })
	}

	const enableSelector = () => {
		if (isEmpty(preview.entity)) return
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				selector: {
					...selector,
					state: !editor.state,
				}
			}
		})
	}

	const addToSelection = async (entity) => {
		let newSelection = [...selection, entity]
		await dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				selector: {
					...selector,
					selection: newSelection
				}
			}
		})
	}

	const deleteSelection = () => {

	}

	return { fullReset, enableEditor, enableSelector, addToSelection, deleteSelection }
}

export default useManagerActions
