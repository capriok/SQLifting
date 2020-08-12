import React from 'react'
import views from '../styles/views.module.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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


	return (
		<>
			<div className={views.keystone}>
				<Actionbar />
				<div className={views.keyscroll}>
					<Switch>
						{routes.map((route, i) => (
							<RouteWithSubRoutes key={i} {...route} />
						))}
					</Switch>
				</div>
			</div>
		</>
	)
}

export default Keystone

const RouteWithSubRoutes = (route) => (
	<Route
		path={route.path}
		render={props => (
			// pass the sub-routes down to keep nesting
			<route.component {...props} routes={route.routes} />
		)}
	/>
)