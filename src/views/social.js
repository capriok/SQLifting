/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../state/state'

import styles from '../styles/social/social.module.scss'

import User from '../components/social/user/user'
import Discover from '../components/social/discover/discover'


const Social = () => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	return (
		<div className={styles.social}>
			<Route path='/social/user' render={() => (
				<>
					<User />
				</>
			)} />
			<Route path='/social/discover' render={() => (
				<>
					<Discover />
				</>
			)} />
		</div>
	)
}

export default Social