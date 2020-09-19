/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { useStateValue } from '../state/state'
import useWorkoutActions from '../components/actionbar/useWorkoutActions'
import styles from '../styles/workout/workout.module.scss'

const Workout = () => {
	const [{ composites: { wocos } },] = useStateValue()
	useEffect(() => {
		return () => fullReset()
	}, [])
	const { fullReset } = useWorkoutActions()

	return (
		<>
			<h1 align="center" className={styles.workout}>Workout</h1>
			<div>{wocos.map((woco, i) => (
				<p key={i}>{woco.name}</p>
			))}</div>
		</>
	)
}

export default Workout
