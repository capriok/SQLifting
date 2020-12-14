/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route } from 'react-router-dom'

import styles from '../styles/social/social.module.scss'

import User from '../components/social/user/user'
import Discover from '../components/social/discover/discover'

const Social = () => {
	return (
		<div className={styles.social}>
			<Route path='/social/user/:uid' render={() => (
				<>
					<User />
				</>
			)} />
			{/* <Route path='/social/discover' render={() => (
				<>
					<Discover />
				</>
			)} /> */}
		</div>
	)
}

export default Social