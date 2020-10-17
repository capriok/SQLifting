/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash';

import styles from '../../../styles/assemble/assemble.module.scss'
import ent from '../../../styles/common/entities.module.scss'
import ext from '../../../styles/assemble/extensions/exercise-extension.module.scss'

import { Input } from 'godspeed';

const ExerciseBuilder = ({ state, dispatch }) => {
	const { steps, activeStep, entities, exerciseBuild: build } = state

	const [name, setName] = useState('')

	useEffect(() => {
		return dispatch({ type: 'RESET' })
	}, [])

	useEffect(() => {
		dispatch({ type: 'BUILD_NAME', name: name })
	}, [name])

	useEffect(() => {
		steps.length > 0 && checkStep()
	}, [activeStep])

	function checkStep() {
		if (!isEmpty(build[steps[activeStep].name])) {
			dispatch({ type: 'READY', state: true })
		}
	}

	function addToBuild(entity) {
		dispatch({ type: 'ALTER_EX_BUILD', entity })
	}

	function activeEntity(entity) {
		if (build[steps[activeStep].name] === undefined) return ent.entity
		return build[steps[activeStep].name].id === entity.id
			? `${ent.entity} ${ent.active_entity}`
			: ent.entity
	}

	return (
		<>
			<div className={ent.entities}>
				{entities.map((entity, i) => (
					<div key={i} className={ent.entity_cont}>
						<div
							className={activeEntity(entity)}
							onClick={() => addToBuild(entity)}>
							<div><p>{entity.name}</p></div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.extension}>
				{build.name
					? <p className={styles.title}>{build.name}</p>
					: <p className={styles.name_placeholder}>Build name</p>}
				<div className={styles.name_input}>
					<Input
						placeholder="Give it a name"
						value={name}
						onChange={e => setName(e.target.value.replace(/[^a-zA-Z&(\)\[\]\{\}\,\'\"\-+]+/ig, ''))} />
				</div>
				<div className={ext.exercise_exntension}>
					<p>Equipment: <span>{build.equipment.name}</span></p>
					<p>Muscle: <span>{build.muscle.name}</span></p>
					<p>Exercise: <span>{build.exercise.name}</span></p>
				</div>
			</div>
		</>
	)
}

export default ExerciseBuilder
