/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import styles from '../styles/action-bar.module.scss'

import { Button } from 'godspeed'

import useActionBarActions from '../utils/useActionBarActions'

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
					<Button text="Edit" size="xsm" onClick={() => toggle('edit')} />
					<Button text="Select" size="xsm" onClick={() => toggle('select')} />
					<Button text="Delete" size="xsm" onClick={() => { }} disabled />
				</div>
			</div>
		</>
	)
}

export default Actionbar
