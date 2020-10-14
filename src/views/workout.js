/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../global/state'
import useWorkoutActions from '../components/actionbar/useWorkoutActions'

import styles from '../styles/workout/workout.module.scss'
import Prepare from '../components/workout/prepare'
import WorkoutPreview from '../components/workout/workout-preview'
import Actionbar from '../components/actionbar/actionbar'

import WorkoutActions from '../components/workout/actions'

const Workout = () => {
	const [{
		composites,
		workout: {
			preview: {
				entity
			}
		}
	},] = useStateValue()

	useEffect(() => {
		return () => fullReset()
	}, [])

	const { fullReset, setPreview } = useWorkoutActions()

	const entityClass = (id) => {
		if (entity && id === entity.id) {
			return `${styles.entity} ${styles.active_entity}`
		} else {
			return `${styles.entity}`
		}
	}

	return (
		<>
			<Actionbar title="Workouts">
				<WorkoutActions />
			</Actionbar>
			<div className={styles.workout}>
				<Route exact path='/workout' render={() => (
					<>
						<div className={styles.entities}>
							<div className={styles.actionbar_gap} />
							{composites.workouts.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div
										className={entityClass(entity.id)}
										onClick={() => { setPreview(entity) }}>
										<div><p>{entity.name}</p></div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.extension}>
							{entity
								? <WorkoutPreview entity={entity} />
								: <div className={styles.preview}>
									<p className={styles.title}>Select an entity to preview</p>
								</div>
							}
						</div>
					</>)} />
				<Route path='/workout/:id/prepare' render={() => {
					return (
						<Prepare />
					)
				}} />
			</div>
		</>
	)
}

export default Workout
