import React from 'react'
import styles from '../styles/main.module.scss'
import Navbar from '../components/navbar'

const MainLayout = (props) => {
	return (
		<>
			<Navbar />
			<div className={styles.main}>
				{props.children}
			</div>
		</>
	)
}

export default MainLayout
