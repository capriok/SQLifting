import React from 'react'
import { useStateValue } from '../../global/state'

import styles from '../../styles/common/navbar.module.scss'
import logo from '../../assets/sql_dolphin.png'

import { Navbar as Nav, NavLink } from 'godspeed'

const notMobile = window.screen.width >= 420

const Navbar: React.FC = () => {
	const [{ options, components }, dispatch] = useStateValue()

	function flipSidebar() {
		dispatch({ type: 'COMPONENT_ACTION', components: { ...components, sidebar: !components.sidebar } })
		localStorage.setItem('SQLifting-components', JSON.stringify({ sidebar: !components.sidebar }))
	}

	return (
		<>
			<Nav className={styles.navbar} title="SQLifting" to="/">
				{!options.sidebarOption && notMobile
					? <NavLink
						hover={options.accentOption}
						onClick={() => flipSidebar()}>
						☰
				 </NavLink>
					: <img className={styles.desktop_logo} src={logo} alt="" />
				}
				<NavLink
					className={styles.mobile_button}
					style={!notMobile && components.sidebar ? { backgroundColor: options.accentOption } : {}}
					hover="steelblue"
					onClick={() => flipSidebar()}>
					☰
					 </NavLink>
			</Nav>
		</>
	)
}

export default Navbar

