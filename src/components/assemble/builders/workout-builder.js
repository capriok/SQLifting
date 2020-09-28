import React from 'react'
import { uniqBy, remove } from 'lodash'
import { useStateValue } from '../../../state/state'

import check from '../../../images/check_black.png'

import styles from '../../../styles/assemble/assemble.module.scss'
import ext from '../../../styles/assemble/extensions/workout-extension.module.scss'

import { Input } from 'godspeed';
import WorkoutDetailer from '../detailers/workout-detailer'

const WorkoutBuilder = () => {
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
		switch (entity.table) {
			case 'exco':
				entity.sets = 0
				entity.reps = 0
				entity.weight = 0
				break;
			case 'circ':
				entity.sets = 0
				break;
			default:
				break;
		}
		let buildProp = steps[activeStep].label.toLowerCase()
		let updatedBuild = []
		let bool
		if (build[buildProp] !== undefined) {
			// if build has > 0 of buildProp => spread buildProp and add entity
			updatedBuild = [...build[buildProp], entity]
			if (build[buildProp].some(s => s.id === entity.id)) {
				// If entity is already in build => remove it
				updatedBuild = remove(updatedBuild, s => s.id !== entity.id)
				if (build[buildProp].length === 1 && activeStep !== 1) {
					// if build has 1 of buildProp => bool = false
					bool = false
				} else {
					bool = true
				}
			} else {
				// Add selected entity to build and make sure its unique by id
				updatedBuild = uniqBy(updatedBuild, 'id')
				bool = true
			}
		} else {
			// if build has < 1 of buildProp => only add entity
			updatedBuild = [entity]
			bool = true
		}
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				readyForNext: bool,
				build: {
					...build,
					[buildProp]: updatedBuild
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
			{build.hasOwnProperty('exercises') && build.hasOwnProperty('circuits') && <>
				{activeStep < steps.length - 1
					? <>
						<div className={styles.entities}>
							{activeEntities.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div className={activeEntity(entity)} onClick={() => addToWorkoutBuild(entity)}>
										{build[steps[activeStep].label.toLowerCase()].some(s => s.id === entity.id) &&
											<img src={check} alt="" />
										}
										<div><p>{entity.name}</p></div>
									</div>
								</div>
							))}
						</div>
					</>
					: <>
						<WorkoutDetailer />
					</>}
				<div className={styles.extension}>
					{build.name
						? <p className={styles.title}>{build.name}</p>
						: <p className={styles.name_placeholder}>Build name</p>
					}
					<div className={styles.name_input}>
						<Input
							placeholder="Give it a name"
							onChange={e => nameBuild(e.target.value)} />
					</div>
					<div className={ext.workout_exntension}>
						{build.exercises.length > 0 && <>
							<p>Exercises</p>
							<ul>
								{build.exercises.map((exco, i) => (
									<li key={i} className={activeStep === 2 ? ext.li_bb : null}>
										<span>{exco.name}</span>
										{activeStep === 2 && <div>
											<span>{exco.sets} Sets</span>
											<span>{exco.reps} Reps</span>
											<span>{exco.weight} lbs</span>
										</div>}
									</li>
								))}
							</ul>
						</>}
						{build.circuits.length > 0 && <>
							<p>Circuits</p>
							<ul>
								{build.circuits.map((exco, i) => (
									<li key={i} className={activeStep === 2 ? ext.li_bb : null}>
										<span>{exco.name}</span>
										{activeStep === 2 && <div>
											<span>{exco.sets} Sets</span>
										</div>}
									</li>
								))}
							</ul>
						</>}
					</div>
				</div>
			</>}
		</>
	)
}

export default WorkoutBuilder
