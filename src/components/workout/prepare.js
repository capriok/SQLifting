import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../global/state'
import { useParams } from 'react-router-dom'
import styles from '../../styles/workout/prepare.module.scss'

const Prepare = () => {
	const [{ composites }] = useStateValue()

	const [workout, setWorkout] = useState({})

	const ID = parseInt(useParams().id)

	useEffect(() => {
		let woco = composites.workouts.find(w => w.id === ID)
		setWorkout(woco)
	}, [composites.workouts, ID])

	useEffect(() => {
		!isEmpty(workout) && console.log('%cActive Workout', 'color: lightskyblue', { workout });
	}, [workout])

	return (
		<div className={styles.prepare}>
			{ workout
				? <>
					<h1>{workout.name}</h1>
				</>
				: <></>
			}
		</div>
	)
}

export default Prepare
