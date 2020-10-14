/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../global/state'
import useOutsideClick from '../../utils/useOutsideClick'
import useUpdate from '../../utils/useUpdate';

import styles from '../../styles/manage/actions.module.scss'

import { Button } from 'godspeed'

const ManageActions = ({ state, dispatch }) => {
	const [{ user }] = useStateValue()

	const update = useUpdate()

	const [confirming, setConfirming] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	});

	const deleteSelection = () => {
		let group = state.selection[0].group
		let table = state.selection[0].table
		// Map ids into a string with ids comma seperated for sql query 
		let selectionIds = [state.selection.map(sel => sel.id)].toString()
		// Delete all ids from passed table by id
		SQLifting.post('/byId', { table, ids: selectionIds, uid: user.details.uid })
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
						state.selection.forEach((sel, index) => {
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
			.then(() => {
				update(group, [table + 's'])
				dispatch({ type: 'RESET_SELECTION' })
			})
			.catch(e => console.log(e))
	}

	return (
		<div className={styles.manage_actions}>
			<Button
				text="Edit"
				className={state.ext.edit ? styles.active_button : null}
				onClick={() => dispatch({ type: 'TOGGLE_EDIT' })}
				disabled={isEmpty(state.preview)}
			/>
			<div className={styles.select_group}>
				<Button
					text="Select"
					className={state.ext.select ? `${styles.active_button} ${styles.select}` : styles.select}
					onClick={() => dispatch({ type: 'TOGGLE_SELECT' })}
				/>
				{
					confirming
						? <div ref={ref}>
							< Button
								text="Confirm"
								className={`${styles.delete} ${styles.warn}`}
								onClick={() => { deleteSelection(); setConfirming(false) }} />
						</div>
						: <Button
							text="Delete"
							className={`${styles.delete}`}
							onClick={() => setConfirming(true)}
							disabled={isEmpty(state.selection)} />
				}
			</div>
		</div >
	)
}

export default ManageActions
