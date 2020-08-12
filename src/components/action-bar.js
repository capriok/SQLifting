import React from 'react'
import styles from '../styles/action-bar.module.scss'

const ActionBTN = (props) => <span className={styles.btn}><button  {...props}>{props.title}</button></span>

const Actionbar = () => {
	return (
		<>
			<div className={styles.actionbar}>
				<h1>Title of entity</h1>
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
