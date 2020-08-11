import React from 'react'
import views from './styles/views.module.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Manager from './manager'
import Assembly from './assembly'
import Workout from './workout'

const Keystone = () => {
	const routes = [
		{
			path: "/manager",
			component: Manager
		},
		{
			path: "/assembly",
			component: Assembly
		},
		{
			path: "/workout",
			component: Workout
		},
		// {
		// 	path: "/",
		// 	component: '',
		// routes: [
		// 	{
		// 		path: "/''/''",
		// 		component: ''
		// 	}
		// ]
		// }
	]

	const RouteWithSubRoutes = (route) => (
		<Route
			path={route.path}
			render={props => (
				// pass the sub-routes down to keep nesting
				<route.component {...props} routes={route.routes} />
			)}
		/>
	)
	return (
		<>
			<div className={views.keystone}>
				<Switch>
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Switch>
			</div>
		</>
	)
}

export default Keystone
