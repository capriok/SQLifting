import React from 'react'
import styles from './main.module.scss'

const MainLayout: React.FC = ({ children }) => (
	<div className={styles.main}>
		{children}
	</div>
)

export default MainLayout
