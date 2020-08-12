import React from 'react'
import styles from './styles/views.module.scss'

const Layout = (props) => {
	return (
		<>
			<div className={styles.main}>
				{props.children}
			</div>
		</>
	)
}

export default Layout
