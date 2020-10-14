/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'

import styles from '../../styles/general/actionbar.module.scss'

const Actionbar = ({ title, children }) => {
	return (
		<div className={styles.actionbar}>
			<h1>{title}</h1>
			{children}
		</div>
	)
}

export default Actionbar
