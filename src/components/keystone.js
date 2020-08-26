/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RouteHandler from '../utils/routeHandler'

import styles from '../styles/keystone.module.scss'

import Manage from '../views/manage'
import Assemble from '../views/assemble'
import Workout from '../views/workout'
import Actionbar from './action-bar'
import Greeting from '../views/greeting'

const Keystone = () => {
	const routes = [
		{
			path: "/manage",
			component: Manage
		},
		{
			path: "/assemble",
			component: Assemble
		},
		{
			path: "/workout",
			component: Workout
		}
	]
	return (
		<>
			<div className={styles.keystone}>
				<Switch>
					<Route exact path='/' render={() => (
						<Greeting />
					)} />
					{routes.map((route, i) => (
						<React.Fragment key={i}>
							<Actionbar />
							<RouteHandler {...route} />
						</React.Fragment>
					))}
				</Switch>
			</div>
		</>
	)
}

export default Keystone