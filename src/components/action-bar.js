/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../state'
import useManagerActions from '../utils/useManagerActions'

import styles from '../styles/action-bar.module.scss'

import { Button } from 'godspeed'

const Actionbar = () => {
	const [{
		manager: {
			active,
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
	const [title, setTitle] = useState('')

	const { toggleEditor, toggleSelector, deleteSelection } = useManagerActions()

	useEffect(() => {
		setTitle(active.name)
	}, [active])

	return (
		<>
			<div className={styles.actionbar}>
				<h1>{title}</h1>
				<div className={styles.actions}>
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
			</div>
		</>
	)
}

export default Actionbar
