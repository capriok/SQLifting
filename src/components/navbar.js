/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../state'

import styles from '.././styles/navbar.module.scss'
import logo from '../images/official_logo_bluesql.png'

import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = ({ sidebarOpen, setSidebar }) => {
	const [{ options: { sidebar } }] = useStateValue()
	const notMobile = window.screen.width >= 420

	return (
		<>
			<Nav className={styles.navbar} title="SQLifting" to="/">
				{!sidebar
					? <NavLink
						hover="steelblue"
						onClick={() => setSidebar(!sidebarOpen)}>
						☰
				 </NavLink>
					: <img className={styles.desktop_logo} src={logo} alt="" />
				}
				<NavLink
					className={styles.mobile_button}
					style={!notMobile && sidebarOpen ? { backgroundColor: '#267fbb' } : {}}
					hover="steelblue"
					onClick={() => setSidebar(!sidebarOpen)}>
					☰
					 </NavLink>
			</Nav>
			<div className={styles.break} />
		</>
	)
}

export default Navbar

