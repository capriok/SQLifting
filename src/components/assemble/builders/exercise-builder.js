import React from 'react'
import { useStateValue } from '../../../state/state'

import styles from '../../../styles/assemble/assemble.module.scss'
import ext from '../../../styles/assemble/extensions/exercise-extension.module.scss'
import { Input } from 'godspeed';

const ExerciseBuilder = () => {
	const [{
		assemble,
		assemble: {
			activeEntities,
			build
		}
	}, dispatch] = useStateValue()

	const nameBuild = (val) => {
		if (build.name && build.name === '') return delete build.name
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

	const addToExerciseBuild = (entity) => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				readyForNext: true,
				build: {
					...build,
					[activeEntities[0].table]: entity
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
			{build.hasOwnProperty('equipment') &&
				build.hasOwnProperty('muscle') &&
				build.hasOwnProperty('exercise') && <>
					<div className={styles.entities}>
						{activeEntities.map((entity, i) => (
							<div key={i} className={styles.entity_cont}>
								<div
									className={activeEntity(entity)}
									onClick={() => addToExerciseBuild(entity)}>
									<div><p>{entity.name}</p></div>
								</div>
							</div>
						))}
					</div>
					<div className={styles.extension}>
						{build.name
							? <p className={styles.title}>{build.name}</p>
							: <p className={styles.name_placeholder}></p>}
						<div className={styles.name_input}>
							<Input
								placeholder="Give it a name"
								onChange={e => nameBuild(e.target.value)} />
						</div>
						<div className={ext.exercise_exntension}>
							<p>Equipment: <span>{build.equipment.name}</span></p>
							<p>Muscle: <span>{build.muscle.name}</span></p>
							<p>Exercise: <span>{build.exercise.name}</span></p>
						</div>
					</div>
				</>}
		</>
	)
}

export default ExerciseBuilder
