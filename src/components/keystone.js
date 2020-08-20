/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RouteHandler from '../utils/routeHandler'

import styles from '../styles/main.module.scss'

import Manage from '../views/manage'
import Assemble from '../views/assemble'
import Workout from '../views/workout'
import Actionbar from './action-bar'

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
				<Actionbar />
				<Switch>
					{routes.map((route, i) => (
						<RouteHandler key={i} {...route} />
					))}
				</Switch>
			</div>
		</>
	)
}

export default Keystone