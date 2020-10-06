/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Route } from 'react-router-dom'
import useActiveByPath from '../../utils/useActiveByPath'

import styles from '../../styles/general/actionbar.module.scss'
import ManageActions from '../manage/actions'
import AssembleActions from '../assemble/actions'
import WorkoutActions from '../workout/actions'

const Actionbar = () => {
	const activeByPath = useActiveByPath()
	return (
		<>
			<div className={styles.actionbar}>
				<h1>{activeByPath.name}</h1>
				<Route path='/manage' component={ManageActions} />
				<Route path='/assemble' component={AssembleActions} />
				<Route path='/workout' component={WorkoutActions} />
			</div>
		</>
	)
}

export default Actionbar
