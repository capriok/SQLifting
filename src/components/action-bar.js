/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import styles from '../styles/action-bar.module.scss'

const ActionBTN = (props) => <span className={styles.btn}><button  {...props}>{props.title}</button></span>

let query = window.location.pathname.split('/')[3]

const Actionbar = () => {
	const [{ active },] = useStateValue()
	const [title, setTitle] = useState('')

	useEffect(() => {
		setTitle(active.name)
	}, [active])

	return (
		<>
			<div className={styles.actionbar}>
				<h1>{title}</h1>
				<div className={styles.actions}>
					<ActionBTN title="Edit" />
					<ActionBTN title="Select" />
					<ActionBTN title="Delete" disabled={true} />
				</div>
			</div>
		</>
	)
}

export default Actionbar
