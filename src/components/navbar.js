/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../state'

import styles from '.././styles/navbar.module.scss'

import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = ({ SB, openSidebar }) => {
	const [, dispatch] = useStateValue()

	const logoutActions = async () => {
		await dispatch({ type: 'LOGOUT' })
		localStorage.removeItem('SQLifting-token')
		localStorage.removeItem('SQLifting-user')
		window.location.pathname = '/'
	}

	const notMobile = window.screen.width >= 420

	return (
		<>
			<Nav className={styles.navbar} title="SQLifting" to="/">
				<NavLink
					className={styles.desktop_button}
					hover="steelblue"
					onClick={() => logoutActions()}>
					Logout
				</NavLink>
				<NavLink
					className={styles.mobile_button}
					style={!notMobile && SB ? { backgroundColor: '#267fbb' } : {}}
					hover="steelblue"
					onClick={() => openSidebar()}>
					☰
					 </NavLink>
			</Nav>
			<div className={styles.break} />
		</>
	)
}

export default Navbar

