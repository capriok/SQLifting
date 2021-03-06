import React from 'react'

import styles from '../../styles/common/actionbar.module.scss'

const Actionbar = ({ title, children }) => {
	return (
		<div className={styles.actionbar_wrapper}>
			<div className={styles.actionbar}>
				<h1>{title}</h1>
				{children}
			</div>
		</div>
	)
}

export default Actionbar
