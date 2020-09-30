/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route } from 'react-router-dom'

import styles from '../styles/general/keystone.module.scss'

import Greeting from '../views/greeting'
import Profile from '../views/profile'
import Actionbar from './actionbar/actionbar'
import Manage from '../views/manage'
import Assemble from '../views/assemble'
import Workout from '../views/workout'

const Keystone = () => {
	return (
		<>
			<div className={styles.keystone}>
				<Route exact path='/' render={() => (
					<>
						<Greeting />
					</>
				)} />
				<Route path='/user' render={() => (
					<>
						<Profile />
					</>
				)} />
				<Route path="/manage" render={() => (
					<>
						<Actionbar />
						<Manage />
					</>
				)} />
				<Route path="/assemble" render={() => (
					<>
						<Actionbar />
						<Assemble />
					</>
				)} />
				<Route path="/workout" render={() => (
					<>
						<Actionbar />
						<Workout />
					</>
				)} />
			</div>
		</>

	)
}

export default Keystone
