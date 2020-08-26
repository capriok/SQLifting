import React from 'react'
import styles from './main.module.scss'

const MainLayout = (props) => {
	return (
		<div className={styles.main}>
			{props.children}
		</div>
	)
}

export default MainLayout
