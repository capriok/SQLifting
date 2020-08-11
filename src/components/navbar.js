import React from 'react'
import styles from './styles/navbar.module.scss'
import { Navbar as Nav, NavLink } from 'godspeed'

const Navbar = (props) => {
	return (
		<>
			<nav className={styles.nav} title="SQLifting">
			</nav>
			<Nav className={styles.navbar} title="SQLifting">
				{/* <NavLink hover="steelblue" onClick={() => props.logoutActions()}>
					Logout
        </NavLink> */}
			</Nav>
		</>
	)
}

export default Navbar

