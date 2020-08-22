/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../state'

import styles from '.././styles/navbar.module.scss'

import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = () => {
	const [, dispatch] = useStateValue()
	const logoutActions = async () => {
		await dispatch({ type: 'LOGOUT' })
		localStorage.removeItem('SQLifting-token')
		localStorage.removeItem('SQLifting-user')
		window.location.pathname = '/'
	}

	return (
		<>
			<Nav className={styles.navbar} title="SQLifting" to="/">
				<NavLink hover="steelblue" onClick={() => logoutActions()}>
					Logout
        </NavLink>
			</Nav>
			<div className={styles.break} />
		</>
	)
}

export default Navbar

