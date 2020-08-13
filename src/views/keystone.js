/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import views from '../styles/views.module.scss'

import RouteHandler from '../utils/routeHandler'

import Manage from './manage'
import Assemble from './assemble'
import Workout from './workout'
import Actionbar from '../components/action-bar'

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
			<div className={views.keystone}>
				<Actionbar />
				<div className={views.keyscroll}>
					<Switch>
						{routes.map((route, i) => (
							<RouteHandler key={i} {...route} />
						))}
					</Switch>
				</div>
			</div>
		</>
	)
}

export default Keystone