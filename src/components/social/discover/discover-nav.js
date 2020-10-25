import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../../../styles/social/discover/discover-nav.module.scss'

import { Button } from 'godspeed'

const DiscoverNav = () => {
	return (
		<div className={styles.nav}>
			<Link to="/social/discover">
				<h1 className={styles.title}>Discover</h1>
			</Link>
			<div className={styles.links}>
				<Link to="/social/discover/community">
					<Button text="Community" name="link" />
				</Link>
				<Link to="/social/discover/people">
					<Button text="Find people" />
				</Link>
			</div>
		</div>
	)
}

export default DiscoverNav
