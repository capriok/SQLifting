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
			preview,
			editor,
			selector
		}
	}, dispatch] = useStateValue()
	const [title, setTitle] = useState('')

	const { enableEditor, enableSelector, deleteSelection } = useManagerActions()

	useEffect(() => {
		setTitle(active.name)
	}, [active])


	return (
		<>
			<div className={styles.actionbar}>
				<h1>{title}</h1>
				<div className={styles.actions}>
					<Button text="Edit" size="xsm" onClick={() => enableEditor()} disabled={isEmpty(preview.entity)} />
					<Button text="Select" size="xsm" onClick={() => enableSelector()} disabled={isEmpty(preview.entity)} />
					<Button text="Delete" size="xsm" onClick={() => deleteSelection()} disabled={isEmpty(selector.selection)} />
				</div>
			</div>
		</>
	)
}

export default Actionbar
