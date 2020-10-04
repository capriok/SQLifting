/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'
import useManageActions from '../actionbar/useManageActions'
import useOutsideClick from '../../utils/useOutsideClick'

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

	const [confirming, setConfirming] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	});


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
				{confirming
					? <div ref={ref}>
						<Button
							text="Confirm"
							size="xsm"
							className={`${styles.delete} ${styles.warn}`}
							onClick={() => deleteSelection(selection, table)} />
					</div>
					: <Button
						text="Delete"
						size="xsm"
						className={`${styles.delete}`}
						onClick={() => setConfirming(true)}
						disabled={isEmpty(selector.selection)} />
				}
			</div>
		</div>
	)
}

export default ManageActions
