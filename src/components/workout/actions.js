import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from '../../styles/workout/actions.module.scss'

import { Button } from 'godspeed'
import { isEmpty } from 'lodash'

const WorkoutActions = ({ state, dispatch }) => {

	const { preview } = state

	const history = useHistory()

	const atIndex = history.location.pathname === '/workout'

	return (
		<div className={styles.workout_actions}>
			<>
				<Button
					text="Back"
					onClick={() => history.push('/workout')}
					disabled={atIndex} />
				<Button
					text="Prepare"
					onClick={() => {
						history.push(`/workout/${preview.id}/prepare`)
					}}
					disabled={isEmpty(preview) || !atIndex} />
				<Button
					text="Start Workout"
					onClick={() => { }}
					disabled={atIndex} />
			</>
		</div>
	)
}

export default WorkoutActions
