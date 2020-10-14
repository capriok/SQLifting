/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../global/state'

import styles from '.././styles/common/navbar.module.scss'
import logo from '../assets/official_logo_bluesql.png'

import { Navbar as Nav, NavLink } from 'godspeed'

const notMobile = window.screen.width >= 420

const Navbar = () => {
	const [{
		options: { sidebarOption, accentOption },
		components,
		components: { sidebar } },
		dispatch] = useStateValue()

	const flipSidebar = () => {
		dispatch({ type: 'COMPONENT_ACTION', components: { ...components, sidebar: !sidebar } })
		localStorage.setItem('SQLifting-components', JSON.stringify({ sidebar: !sidebar }))
	}

	return (
		<>
			<Nav className={styles.navbar} title="SQLifting" to="/">
				{!sidebarOption && notMobile
					? <NavLink
						hover={accentOption}
						onClick={() => flipSidebar()}>
						☰
				 </NavLink>
					: <img className={styles.desktop_logo} src={logo} alt="" />
				}
				<NavLink
					className={styles.mobile_button}
					style={!notMobile && sidebar ? { backgroundColor: accentOption } : {}}
					hover="steelblue"
					onClick={() => flipSidebar()}>
					☰
					 </NavLink>
			</Nav>
			<div className={styles.navbar_gap} />
		</>
	)
}

export default Navbar

