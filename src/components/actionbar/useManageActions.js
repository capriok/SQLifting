/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state/state'
import useUpdate from '../../utils/useUpdate';

import { isEmpty, uniqBy, remove } from 'lodash'

const useManageActions = () => {
	const [{
		user: { details: { uid } },
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
			// Add selected entity to selection and make sure its unique by id
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

	// Iterate thru selection entities => remove them from DB
	const deleteSelection = (selection) => {
		let group = selection[0].group
		let table = selection[0].table
		// Map ids into a string with ids comma seperated for sql query 
		let selectionIds = [selection.map(sel => sel.id)].toString()
		// Delete all ids from passed table by id
		SQLifting.post('/byId', { table, ids: selectionIds, uid: uid })
			.then(async () => {
				console.log('Delete Success!')
				// If table is circ or woco ==> delete its deps from relation tables by id
				switch (table) {
					case 'circ':
						SQLifting.post(`/circ_movs`, { ids: selectionIds, })
							.then(() => { }).catch(err => console.log(err))
						break;
					case 'woco':
						// we know there will be woco_excos => delete them
						SQLifting.post(`/woco_excos`, { ids: selectionIds })
							.then(() => { }).catch(err => console.log(err))
						// If selection entity has 0 circs => remove id from selectionIds
						selection.forEach((sel, index) => {
							if (sel.circs.length === 0) {
								selectionIds = selectionIds.split(',').filter((_, i) => i !== index).toString()
							}
						})
						// Only fire req to delete woco_circs if selectionIds has a value
						if (selectionIds) {
							SQLifting.post(`/woco_circs`, { ids: selectionIds })
								.then(() => { }).catch(err => console.log(err))
						}
						break;
					default:
						break;
				}
			})
			.then(() => update(group, [table + 's']))
			.catch(e => console.log(e))
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
