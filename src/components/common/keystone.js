/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route } from 'react-router-dom'

import styles from '../../styles/common/keystone.module.scss'

import Greeting from '../../views/greeting'
import Manage from '../../views/manage'
import Assemble from '../../views/assemble'
import Workout from '../../views/workout'
import Social from '../../views/social'

const Keystone = () => {
	return (
		<>
			<div className={styles.keystone}>
				<Route exact path='/' render={() => (
					<>
						<Greeting />
					</>
				)} />
				<Route path="/manage/:group/:entities" render={(props) => (
					<>
						<Manage params={props.match.params} />
					</>
				)} />
				<Route path="/assemble/composites/:entities" render={(props) => (
					<>
						<Assemble params={props.match.params} />
					</>
				)} />
				<Route path="/workout/" render={() => (
					<>
						<Workout />
					</>
				)} />
				<Route path='/social' render={() => (
					<>
						<Social />
					</>
				)} />
			</div>
		</>

	)
}

export default Keystone
