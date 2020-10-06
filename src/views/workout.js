/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../state/state'
import useWorkoutActions from '../components/actionbar/useWorkoutActions'

import styles from '../styles/workout/workout.module.scss'
import Prepare from '../components/workout/prepare'

const Workout = () => {
	const [{
		composites: {
			wocos
		},
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
		<div className={styles.workout}>
			<Route exact path='/workout' render={() => (
				<>
					<div className={styles.entities}>
						<div className={styles.actionbar_gap} />
						{wocos.map((entity, i) => (
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
							? <div className={styles.preview}>
								<p className={styles.title}>{entity.name}</p>
								<p className={styles.dep}>Exercises</p>
								<ul>
									{entity.excos.map((dep, i) => (
										<div key={i}>
											<li className={styles.detail}>{dep.name}</li>
											<ul>
												<li>Sets: <span>{dep.sets}</span></li>
												<li>Reps: <span>{dep.reps}</span></li>
												<li>Weight: <span>{dep.weight}</span></li>
											</ul>
										</div>
									))}
								</ul>
								<p className={styles.dep}>Circuits</p>
								{entity.circs.length > 0
									? <>
										<ul>
											{entity.circs.map((dep, i) => {
												return (
													<div key={i}>
														<li className={styles.detail}>
															{dep.name}: <span>{dep.sets} {dep.sets === 1 ? 'Set' : 'Sets'}</span>
														</li>
														<ul>
															{dep.deps.map((dep, i) => (
																<li key={i}>{dep.name}: <span>{dep.duration}</span></li>
															))}
														</ul>
													</div>
												)
											})}
										</ul>
									</>
									: <><ul><span>None</span></ul></>}
							</div>
							: <>
								<div className={styles.preview}>
									<p className={styles.title}>Select an entity to preview</p>
								</div>
							</>
						}
					</div>
				</>)} />
			<Route path='/workout/:queryid/prepare' render={() => (
				<Prepare />
			)} />
		</div>
	)
}

export default Workout
