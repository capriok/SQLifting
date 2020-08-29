/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../state'

import styles from '.././styles/navbar.module.scss'
import logo from '../images/official_logo_bluesql.png'

import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = () => {
	const [{
		options: { sidebarOption },
		components,
		components: { sidebar } },
		dispatch] = useStateValue()
	const notMobile = window.screen.width >= 420

	const flipSidebar = () => dispatch({ type: 'COMPONENT_ACTION', components: { ...components, sidebar: !sidebar } })

	return (
		<>
			<Nav className={styles.navbar} title="SQLifting" to="/">
				{!sidebarOption
					? <NavLink
						hover="steelblue"
						onClick={() => flipSidebar()}>
						☰
				 </NavLink>
					: <img className={styles.desktop_logo} src={logo} alt="" />
				}
				<NavLink
					className={styles.mobile_button}
					style={!notMobile && sidebar ? { backgroundColor: '#267fbb' } : {}}
					hover="steelblue"
					onClick={() => flipSidebar()}>
					☰
					 </NavLink>
			</Nav>
			<div className={styles.break} />
		</>
	)
}

export default Navbar

