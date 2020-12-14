import React, { useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../global/state'
import useOutsideClick from '../../utils/useOutsideClick'
import useUpdate from '../../utils/useUpdate';

import styles from '../../styles/manage/actions.module.scss'

import { Button } from 'godspeed'

interface Props {
	state: ManageState
	dispatch: any
}

const ManageActions: React.FC<Props> = ({ state, dispatch }) => {
	const [{ user }] = useStateValue()

	const update = useUpdate()

	const [confirming, setConfirming] = useState(false)

	const ref: any = useRef()
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	});

	function deleteSelection() {
		let group = state.selection[0].group
		let table = state.selection[0].table
		let selectionIds = [state.selection.map(sel => sel.id)].toString()
		SQLifting.post('/byId', { table, ids: selectionIds, uid: user.details.uid })
			.then(async () => {
				console.log('Delete Success!')
				switch (table) {
					case 'circ':
						SQLifting.post(`/circ_movs`, { ids: selectionIds, })
							.then(() => { }).catch(err => console.log(err))
						break;
					case 'woco':
						SQLifting.post(`/woco_excos`, { ids: selectionIds })
							.then(() => { }).catch(err => console.log(err))
						state.selection.forEach((sel, index) => {
							if (sel.circs.length === 0) {
								selectionIds = selectionIds.split(',').filter((_, i) => i !== index).toString()
							}
						})
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
