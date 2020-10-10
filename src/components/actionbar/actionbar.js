/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route, useParams } from 'react-router-dom'

import styles from '../../styles/general/actionbar.module.scss'
import ManageActions from '../manage/actions'
import AssembleActions from '../assemble/actions'
import WorkoutActions from '../workout/actions'

const Actionbar = () => {
	const params = useParams()
	return (
		<div className={styles.actionbar}>
			<h1>{params.entities || 'workouts'}</h1>
			<Route path='/manage' component={ManageActions} />
			<Route path='/assemble' component={AssembleActions} />
			<Route path='/workout' component={WorkoutActions} />
		</div>
	)
}

export default Actionbar
