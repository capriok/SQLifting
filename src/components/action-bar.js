/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'

import styles from '../styles/action-bar.module.scss'

import useActionBarActions from '../hooks/useActionBarActions'

const ActionBTN = (props) => <span className={styles.btn}><button {...props}>{props.title}</button></span>

const Actionbar = () => {
	const [{ active, actionState }, dispatch] = useStateValue()
	const [title, setTitle] = useState('')

	const { enableAction } = useActionBarActions()

	useEffect(() => {
		setTitle(active.name)
	}, [active])

	const toggle = (prop) => {
		enableAction(prop)
	}

	return (
		<>
			<div className={styles.actionbar}>
				<h1>{title}</h1>
				<div className={styles.actions}>
					<ActionBTN title="Edit" onClick={() => toggle('edit')} />
					<ActionBTN title="Select" onClick={() => toggle('select')} />
					<ActionBTN title="Delete" disabled={true} />
				</div>
			</div>
		</>
	)
}

export default Actionbar
