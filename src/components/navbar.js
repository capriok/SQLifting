/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { useStateValue } from '../state'

import styles from '.././styles/navbar.module.scss'

import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = () => {
	const [{
		components,
		components: {
			sidebar
		}
	}, dispatch] = useStateValue()

	const logoutActions = async () => {
		await dispatch({ type: 'LOGOUT' })
		localStorage.removeItem('SQLifting-token')
		localStorage.removeItem('SQLifting-user')
		window.location.pathname = '/'
	}

	useEffect(() => {
		if (sidebar) document.body.style.overflow = 'hidden';
		return () => document.body.style.overflow = 'initial'
	}, [sidebar])

	const openSidebar = () => {
		dispatch({
			type: 'COMPONENT_ACTION',
			components: {
				...components,
				sidebar: !sidebar
			}
		})
	}

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

