/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../state'

import styles from '.././styles/navbar.module.scss'
import logo from '../gallery/official_logo_bluesql.png'

import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = ({ SB, set }) => {
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
				<img className={styles.desktop_logo} src={logo} alt="" />
				<NavLink
					className={styles.mobile_button}
					style={!notMobile && SB ? { backgroundColor: '#267fbb' } : {}}
					hover="steelblue"
					onClick={() => set(!SB)}>
					☰
					 </NavLink>
			</Nav>
			<div className={styles.break} />
		</>
	)
}

export default Navbar

