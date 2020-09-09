import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../../state/state'
import useAssembleActions from '../../actionbar/useAssembleActions'

import styles from '../../../styles/assemble/assemble.module.scss'
import ext from '../../../styles/assemble/extensions/exercises.module.scss'
import { Input } from 'godspeed';

const Circuits = () => {
	const [{
		assemble,
		assemble: {
			steps,
			activeStep,
			activeEntities,
			build
		}
	}, dispatch] = useStateValue()

	const nameBuild = (val) => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				build: {
					...build,
					name: val
				}
			}
		})
	}

	const addToWorkoutBuild = (entity) => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				build: {
					...build,
				}
			}
		})
	}

	const activeEntity = entity => {
		const idleClass = styles.entity
		const activeClass = `${styles.entity} ${styles.active_entity}`
		if (build[activeEntities[0].table] === undefined) return idleClass
		let inBuild = build[activeEntities[0].table].id === entity.id
		return inBuild ? activeClass : idleClass
	}

	return (
		<>
			{
				activeStep < steps.length - 1
					? <>
						<div className={styles.entities}>
							{activeEntities.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div className={activeEntity(entity)} onClick={() => addToWorkoutBuild(entity)}>
										<div><p>{entity.name}</p></div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.extension}>
							{build.name ? <p className={styles.title}>{build.name}</p> : <p className={styles.name_placeholder}></p>}
							<div className={styles.name_input}>
								<Input placeholder="Give it a name" onChange={e => nameBuild(e.target.value)} />
							</div>
							<div className={ext.circuits_exntension}>
								{/* <p>Equipment: {build.hasOwnProperty('equipment') && <span>{build.equipment.name}</span>}</p>
								 <p>Muscle: {build.hasOwnProperty('muscle') && <span>{build.muscle.name}</span>}</p>
								<p>Exercise: {build.hasOwnProperty('exercise') && <span>{build.exercise.name}</span>}</p> */}
							</div>
						</div>
					</>
					: <>
						<h1>Review</h1>
					</>
			}
		</>
	)
}

export default Circuits
