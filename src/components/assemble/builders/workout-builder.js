/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'
import { uniqBy, remove } from 'lodash'
import { useStateValue } from '../../../global/state'

import check from '../../../assets/check_black.png'

import styles from '../../../styles/assemble/assemble.module.scss'
import ent from '../../../styles/common/entities.module.scss'
import ext from '../../../styles/assemble/extensions/workout-extension.module.scss'

import { Input } from 'godspeed';
import WorkoutDetailer from '../detailers/workout-detailer'

const WorkoutBuilder = (props) => {
	const { steps, activeStep, entities, workoutBuild: build } = props.state
	const dispatch = props.dispatch

	const [name, setName] = useState('')

	// Needed to ensure dispatch finished while component mounts
	const buildReady = steps.length > 0 && steps[activeStep].name === 'exercises'
	const buildProp = steps.length > 0 && steps[activeStep].name

	useEffect(() => {
		return dispatch({ type: 'RESET' })
	}, [])

	useEffect(() => {
		dispatch({ type: 'BUILD_NAME', name: name })
	}, [name])

	useEffect(() => {
		steps.length > 0 && checkStep()
	}, [activeStep, build])

	function checkStep() {
		if (buildReady && buildProp.length >= 3) {
			dispatch({ type: 'READY', state: true })
		}
		if (activeStep === steps.length - 1) {
			dispatch({ type: 'READY', state: true })
		}
	}

	function addToBuild(entity) {
		// switch (entity.table) {
		// 	case 'exco':
		// 		entity.sets = 0
		// 		entity.reps = 0
		// 		entity.weight = 0
		// 		break;
		// 	case 'circ':
		// 		entity.sets = 0
		// 		break;
		// 	default:
		// 		break;
		// }
		// let buildProp = steps[activeStep].label.toLowerCase()
		// let updatedBuild = []
		// let bool
		// if (build[buildProp] !== undefined) {
		// 	// if build has > 0 of buildProp => spread buildProp and add entity
		// 	updatedBuild = [...build[buildProp], entity]
		// 	if (build[buildProp].some(s => s.id === entity.id)) {
		// 		// If entity is already in build => remove it
		// 		updatedBuild = remove(updatedBuild, s => s.id !== entity.id)
		// 		if (build[buildProp].length === 1 && activeStep !== 1) {
		// 			// if build has 1 of buildProp => bool = false
		// 			bool = false
		// 		} else {
		// 			bool = true
		// 		}
		// 	} else {
		// 		// Add selected entity to build and make sure its unique by id
		// 		updatedBuild = uniqBy(updatedBuild, 'id')
		// 		bool = true
		// 	}
		// } else {
		// 	// if build has < 1 of buildProp => only add entity
		// 	updatedBuild = [entity]
		// 	bool = true
		// }
		// dispatch({
		// 	type: 'ASSEMBLE_ACTION',
		// 	assemble: {
		// 		...assemble,
		// 		readyForNext: bool,
		// 		build: {
		// 			...build,
		// 			[buildProp]: updatedBuild
		// 		}
		// 	}
		// })
		dispatch({
			type: 'ALTER_WO_BUILD',
			entity: {
				...entity,
				sets: 0,
				reps: 0,
				weight: 0
			}
		})
	}

	const activeEntity = entity => {
		return ent.entity
		// const idleClass = ent.entity
		// const activeClass = `${ent.entity} ${ent.active_entity}`
		// if (build[activeEntities[0].table] === undefined) return idleClass
		// let inBuild = build[activeEntities[0].table].id === entity.id
		// return inBuild ? activeClass : idleClass
	}

	return (
		<>
			{activeStep < steps.length - 1
				? <>
					<div className={ent.entities}>
						{entities.map((entity, i) => (
							<div key={i} className={ent.entity_cont}>
								<div className={activeEntity(entity)} onClick={() => addToBuild(entity)}>
									{buildReady && build[buildProp].some(s => s.id === entity.id)
										&& <img src={check} alt="" />
									}
									<div><p>{entity.name}</p></div>
								</div>
							</div>
						))}
					</div>
				</>
				: <>
					<WorkoutDetailer {...props} />
				</>}
			<div className={styles.extension}>
				{build.name
					? <p className={styles.title}>{build.name}</p>
					: <p className={styles.name_placeholder}>Build name</p>
				}
				<div className={styles.name_input}>
					<Input
						placeholder="Give it a name"
						value={name}
						onChange={e => setName(e.target.value.replace(/[^a-zA-Z&(\)\[\]\{\}\,\'\"\-+]+/ig, ''))} />
				</div>
				<div className={ext.workout_exntension}>
					{build.exercises.length > 0 && <>
						<p>Exercises</p>
						<ul>
							{build.exercises.map((ex, i) => (
								<li key={i} className={activeStep === 2 ? ext.li_bb : null}>
									<span>{ex.name}</span>
									{activeStep === 2 && <div>
										<span>{ex.sets} Sets</span>
										<span>{ex.reps} Reps</span>
										<span>{ex.weight} lbs</span>
									</div>}
								</li>
							))}
						</ul>
					</>}
					{build.circuits.length > 0 && <>
						<p>Circuits</p>
						<ul>
							{build.circuits.map((ci, i) => (
								<li key={i} className={activeStep === 2 ? ext.li_bb : null}>
									<span>{ci.name}</span>
									{activeStep === 2 && <div>
										<span>{ci.sets} Sets</span>
									</div>}
								</li>
							))}
						</ul>
					</>}
				</div>
			</div>
		</>
	)
}

export default WorkoutBuilder
