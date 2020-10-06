/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'

import styles from '../../styles/workout/actions.module.scss'

import { Button } from 'godspeed'
import useWorkoutActions from '../actionbar/useWorkoutActions'

const WorkoutActions = () => {
	const [{
		workout: {
			preview,
			prepare
		}
	},] = useStateValue()

	const { setPrepare } = useWorkoutActions()

	return (
		<div className={styles.workout_actions}>
			<>
				<Link to="/workout">
					<Button
						text="Back"
						disabled={isEmpty(prepare)} />
				</Link>
				<Link to={`/workout/${preview.entity && preview.entity.id}/prepare`}>
					<Button
						text="Prepare"
						onClick={() => setPrepare(preview.entity)}
						disabled={isEmpty(preview) || !isEmpty(prepare)} />
				</Link>
				<Button
					text="Start Workout"
					onClick={() => { }}
					disabled={isEmpty(prepare)} />
			</>
		</div>
	)
}

export default WorkoutActions
