import React from 'react'
import styles from './views.module.scss'
import Navbar from '../components/navbar'

const Layout = (props) => {
	return (
		<>
			<div className={styles.application}>
				<Navbar />
				{props.children}
			</div>
		</>
	)
}

export default Layout
