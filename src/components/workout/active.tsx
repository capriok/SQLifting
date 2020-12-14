/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import styles from '../../styles/workout/active.module.scss'
import ext from '../../styles/workout/active-ext.module.scss'

import Timer from './timer'
import { Button } from 'godspeed'

interface Props {
	state: any
}

const Active: React.FC<Props> = ({ state }) => {
	const active = state.preview

	const [workout, setWorkout] = useState<any>({})
	const [tab, setTab] = useState({ exercises: true, circuit: false })

	useEffect(() => {
		if (!isEmpty(active)) {
			setWorkout(active)
			console.log('%cActive Workout', 'color: lightskyblue', { workout: active })
		}
	}, [])

	if (isEmpty(workout)) return <></>

	return (
		<div className={styles.active}>
			<div className={styles.workout}>
				{workout
					? <>
						{tab.exercises &&
							<div className={styles.entities}>
								<h1 className={styles.entities_title}>Exercises</h1>
								{workout.exercises.map((ent, i) => (
									<div key={i} className={styles.ex_entity}>
										<div className={styles.entity_main}>
											<p>{ent.name}</p>
											<ul>
												<li>Equipment: <span>{ent.deps.equipment}</span></li>
												<li>Muscle: <span>{ent.deps.muscle}</span></li>
												<li>Exercise: <span>{ent.deps.exercise}</span></li>
											</ul>
										</div>
										<div className={styles.details}>
											<div>{ent.sets} {ent.sets === 1 ? 'Set' : 'Sets'}</div>
											<div>{ent.reps} {ent.sets === 1 ? 'Rep' : 'Reps'}</div>
											<div>{ent.weight} lbs</div>
										</div>
									</div>
								))}
							</div>
						}
						{tab.circuit && workout.circuit.length > 0 &&
							<div className={styles.entities}>
								<h1 className={styles.entities_title}>Circuit</h1>
								{workout.circuit.map((ent, i) => (
									<div key={i} className={styles.ci_entity}>
										<div className={styles.entity_main}>
											<p>{ent.name} <span>{ent.sets} {ent.sets === 1 ? 'Set' : 'Sets'}</span> </p>
											<ul className={styles.dep_ul}>
												{ent.deps.map((dep, i) => (
													<li key={i}>{dep.name}: <span>{dep.duration}</span></li>
												))}
											</ul>
										</div>
									</div>
								))}
							</div>
						}
					</>
					: <div style={{ width: '100%', textAlign: 'center' }}>
						<p>No Workout Found</p>
					</div>
				}
			</div>
			<div className={ext.extension}>
				<Timer />
				{workout.circuit.length > 0 &&
					<div className={ext.tab_group}>
						<Button
							className={tab.exercises && ext.active_tab}
							text="Exercises"
							onClick={() => setTab({ ...tab, exercises: true, circuit: false })} />
						<Button
							className={tab.circuit && ext.active_tab}
							text="Circuit"
							onClick={() => setTab({ ...tab, exercises: false, circuit: true })} />
					</div>
				}
			</div>
		</div>
	)
}

export default Active
