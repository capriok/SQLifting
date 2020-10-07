/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'
import useWorkoutActions from '../actionbar/useWorkoutActions'

import styles from '../../styles/workout/actions.module.scss'

import { Button } from 'godspeed'

const WorkoutActions = () => {
	const [{
		workout: {
			preview,
			prepare
		}
	},] = useStateValue()

	const history = useHistory()

	const { setPrepare } = useWorkoutActions()

	return (
		<div className={styles.workout_actions}>
			<>
				<Button
					text="Back"
					onClick={() => history.push('/workout')}
					disabled={isEmpty(prepare)} />
				<Button
					text="Prepare"
					onClick={() => {
						setPrepare(preview.entity)
						history.push(`/workout/${preview.entity.id}/prepare`)
					}}
					disabled={isEmpty(preview) || !isEmpty(prepare)} />
				<Button
					text="Start Workout"
					onClick={() => { }}
					disabled={isEmpty(prepare)} />
			</>
		</div>
	)
}

export default WorkoutActions
