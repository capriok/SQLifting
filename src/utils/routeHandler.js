/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route } from 'react-router-dom'

export default (route) => {
	return (
		<Route
			path={route.path}
			render={props => {
				return (
					<route.component {...props} routes={route.routes} />
				)
			}
			}
		/>
	)
}

// Routing with Sub Routes
// const routes = [
// 	{
// 		path: "/",
// 		component: "reference"
// 	}
// {
// 		path: "/",
// 		component: '',
// 		routes: [
// 			{
// 				path: "/''/''",
// 				component: ''
// 			}
// 		]
// 	}
// ]