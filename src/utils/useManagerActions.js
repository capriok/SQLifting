/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { SQLifting } from '../api/sqlifting'
import { useStateValue } from '../state'
import useUpdate from '../utils/useUpdate';

import { isEmpty, uniqBy, remove } from 'lodash'

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

	const update = useUpdate()

	const fullReset = () => {
		dispatch({ type: 'RESET_MANAGER' })
	}

	const toggleEditor = () => {
		if (isEmpty(preview.entity)) return
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				editor: {
					...preview,
					state: !editor.state
				},
				selector: {
					...selector,
					state: false,
					selection: []
				}
			}
		})
	}

	const toggleSelector = () => {
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				preview: {
					state: false
				},
				editor: {
					state: false
				},
				selector: {
					...selector,
					state: !selector.state,
					selection: []
				}
			}
		})
	}

	const addToSelection = (entity) => {
		let newSelection = [...selection, entity]
		const unique = arr => uniqBy(arr, 'id')
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				selector: {
					...selector,
					selection: unique(newSelection)
				}
			}
		})
	}

	const removeFromSelection = (id) => {
		let newSelection = [...selection]
		remove(newSelection, s => s.id === id)
		dispatch({
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

	const deleteSelection = (selection, table, type) => {
		let count = 0
		selection.forEach(async record => {
			SQLifting.post('/delete/byid', { table: table, id: record.id })
				.then(() => {
					console.log('Delete Success!')
					if (table === 'circ') {
						return deleteDependencies('circ_movs', record, type, ['circs'])
					}
					if (table === 'woco') {
						return deleteDependencies('woco_excos', record, type, ['wocos'])
					}
					count++
					count === selection.length && update(type, [table + 's'])
				})
				.catch(e => console.log(e))
		});

		const deleteDependencies = async (table, id, type, requests) => {
			await SQLifting.post(`/delete/deps`, { table, id })
				.then(res => update(type, requests))
				.catch(err => console.log(err))
		}
	}

	return {
		fullReset,
		toggleEditor,
		toggleSelector,
		addToSelection,
		removeFromSelection,
		deleteSelection
	}
}

export default useManagerActions
