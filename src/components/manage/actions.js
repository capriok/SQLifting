import React from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'
import useManageActions from '../actionbar/useManageActions'

import styles from '../../styles/manage/actions.module.scss'

import { Button } from 'godspeed'

const ManageActions = () => {
	const [{
		manage: {
			active: {
				group,
				table
			},
			preview,
			editor,
			selector,
			selector: {
				selection
			}
		}
	}] = useStateValue()

	const { toggleEditor, toggleSelector, deleteSelection } = useManageActions()

	return (
		<div className={styles.manage_actions}>
			<Button
				text="Edit"
				size="xsm"
				className={editor.state ? styles.active_button : null}
				onClick={() => toggleEditor()}
				disabled={isEmpty(preview.entity)}
			/>
			<div className={styles.select_group}>
				<Button
					text="Select"
					size="xsm"
					className={selector.state ? `${styles.active_button} ${styles.select}` : styles.select}
					onClick={() => toggleSelector()}
				/>
				<Button
					text="Delete"
					size="xsm"
					className={`${styles.delete_hover} ${styles.delete}`}
					onClick={() => deleteSelection(selection, table, group)}
					disabled={isEmpty(selector.selection)}
				/>
			</div>
		</div>
	)
}

export default ManageActions
