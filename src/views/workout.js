import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import useWorkoutActions from '../components/actionbar/useWorkoutActions'
import useActiveByPath from '../utils/useActiveByPath'
import styles from '../styles/workout/workout.module.scss'

const Workout = () => {
	const [{ },] = useStateValue()
	useEffect(() => {
		console.log('Workout');
		return () => fullReset()
	}, [])
	const activeByPath = useActiveByPath()
	const { fullReset } = useWorkoutActions()

	console.log(activeByPath);

	return (
		<>
			<h1 className={styles.workout}>Workout</h1>
		</>
	)
}

export default Workout
