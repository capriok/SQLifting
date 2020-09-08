import React from 'react'
import { useStateValue } from '../../../state/state'

import styles from '../../../styles/assemble/extensions/exercises.module.scss'

const ExercisesExtension = () => {
	const [{
		assemble: {
			build
		}
	},] = useStateValue()
	return (
		<div className={styles.exercise_exntension}>
			{build.hasOwnProperty('equipment') && <>
				<p>Equipment: <span>{build.equipment.name}</span></p>
			</>}
			{build.hasOwnProperty('muscle') && <>
				<p>Muscle: <span>{build.muscle.name}</span></p>
			</>}
			{build.hasOwnProperty('exercise') && <>
				<p>Exercise: <span>{build.exercise.name}</span></p>
			</>}
		</div>
	)
}

export default ExercisesExtension
