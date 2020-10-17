import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from '../../styles/workout/actions.module.scss'

import { Button } from 'godspeed'

const WorkoutActions = () => {

	const history = useHistory()

	return (
		<div className={styles.workout_actions}>
			<>
				<Button
					text="Back"
					onClick={() => history.push('/workout')}
					disabled={false} />
				<Button
					text="Prepare"
					onClick={() => {
						// history.push(`/workout/${preview.entity.id}/prepare`)
					}}
					disabled={false} />
				<Button
					text="Start Workout"
					onClick={() => { }}
					disabled={false} />
			</>
		</div>
	)
}

export default WorkoutActions
