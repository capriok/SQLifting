import React from 'react'
import styles from './styles/views.module.scss'

const Layout = (props) => {
	return (
		<>
			<div className={styles.application}>
				<div className={styles.main}>
					{props.children}
				</div>
			</div>
		</>
	)
}

export default Layout
