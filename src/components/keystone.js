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

	return (
		<>
			<div className={styles.keystone}>
				<Route exact path='/' render={() => (
					<Greeting />
				)} />
				<Actionbar />
				<Route path="/manage" render={() => (
					<Manage />
				)} />
				<Route path="/assemble" render={() => (
					<Assemble />
				)} />
				<Route path="/workout" render={() => (
					<Workout />
				)} />
			</div>
		</>

	)
}

export default Keystone

// const routes = [
// 	{
// 		path: "/manage",
// 		component: Manage
// 	},
// 	{
// 		path: "/assemble",
// 		component: Assemble
// 	},
// 	{
// 		path: "/workout",
// 		component: Workout
// 	}
// ]

{/* <>
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
</> */}