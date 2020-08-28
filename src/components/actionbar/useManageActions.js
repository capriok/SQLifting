/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state'
import useUpdate from '../../utils/useUpdate';

import { isEmpty, uniqBy, remove } from 'lodash'

const useManageActions = () => {
	const [{
		manage,
		manage: {
			preview,
			editor,
			selector,
			selector: {
				selection
			}
		}
	}, dispatch] = useStateValue()

	const update = useUpdate()

	// Set manage component to initial context state 
	const fullReset = () => {
		dispatch({ type: 'RESET_MANAGE' })
	}

	// Set preview extension 
	const setPreview = (entity) => {
		if (preview.entity && preview.entity.id === entity.id) {
			// If entity is already previewing => unpreview it and return
			return dispatch({
				type: 'MANAGE_ACTION',
				manage: {
					...manage,
					preview: {
						state: false,
					}
				}
			})
		}
		// Inject selected entity
		dispatch({
			type: 'MANAGE_ACTION',
			manage: {
				...manage,
				preview: {
					state: true,
					group: entity.group,
					table: entity.table,
					entity: entity
				},
				editor: { state: false }
			}
		})
	}

	//Set Editor extension
	const toggleEditor = () => {
		// If no entity is currently being previewed => return
		if (isEmpty(preview.entity)) return
		// Toggle extension from preview to editor extension
		dispatch({
			type: 'MANAGE_ACTION',
			manage: {
				...manage,
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

	//Set Selector extension
	const toggleSelector = () => {
		// If previewer or editor are active => disable and toggle selector extension
		dispatch({
			type: 'MANAGE_ACTION',
			manage: {
				...manage,
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

	// When selector extension is open => add or remove selected entity
	const addToSelection = (entity) => {
		let updatedSelection
		if (selection.some(s => s.id === entity.id)) {
			// If entity is already in selection => remove it
			updatedSelection = remove([...selection], s => s.id !== entity.id)
		} else {
			// Add selected entity to selection
			updatedSelection = uniqBy([...selection, entity], 'id')
		}
		dispatch({
			type: 'MANAGE_ACTION',
			manage: {
				...manage,
				selector: {
					...selector,
					selection: updatedSelection
				}
			}
		})
	}

	// Iterate thru selection entities => remove them from DB one by one
	const deleteSelection = (selection, table, type) => {
		// Count variable to monitor when all entities in selection have been removed from DB
		let count = 0
		selection.forEach(async record => {
			SQLifting.post('/delete/byid', { table: table, id: record.id })
				.then(() => {
					console.log('Delete Success!')
					// If entity is a composite => call func to remove its dependencies as well
					if (table === 'circ') {
						return deleteDependencies('circ_movs', record, type, ['circs'])
					}
					if (table === 'woco') {
						return deleteDependencies('woco_excos', record, type, ['wocos'])
					}
					// Add one to count => continue selection itteration
					count++
					// When all selection entities have been removed => update data 
					count === selection.length && update(type, [table + 's'])
				})
				.catch(e => console.log(e))
		});

		const deleteDependencies = async (table, id, type, requests) => {
			await SQLifting.post(`/delete/deps`, { table, id })
				.then(() => update(type, requests))
				.catch(err => console.log(err))
		}
	}

	return {
		fullReset,
		setPreview,
		toggleEditor,
		toggleSelector,
		addToSelection,
		deleteSelection
	}
}

export default useManageActions
