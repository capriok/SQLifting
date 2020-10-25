/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash';

import check from '../../../assets/check_black.png'

import styles from '../../../styles/assemble/assemble.module.scss'
import ent from '../../../styles/common/entities.module.scss'
import ext from '../../../styles/assemble/extensions/exercise-extension.module.scss'
import ss from '../../../styles/common/submit-success.module.scss'

import { Input } from 'godspeed';

const ExerciseBuilder = (props) => {
	const { steps, activeStep, entities, exerciseBuild: build } = props.state
	const dispatch = props.dispatch
	const success = props.success

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
		!isEmpty(build[steps[activeStep].name])
			&& dispatch({ type: 'READY', state: true })
	}

	function addToBuild(entity) {
		dispatch({ type: 'ALTER_EX_BUILD', entity })
	}

	return (
		<>
			<div className={ent.entities}>
				{entities.map((entity, i) => (
					<div key={i} className={ent.entity_cont}>
						<div
							className={ent.entity}
							onClick={() => addToBuild(entity)}>
							<div><p>{entity.name}</p></div>
							{build[steps[activeStep].name] && build[steps[activeStep].name].id === entity.id &&
								<img src={check} alt="" />
							}
						</div>
					</div>
				))}
			</div>
			<div className={styles.extension}>
				{success
					? <h1 className={ss.assemble_submit_success}>Build Successful</h1>
					: <>
						{build.name
							? <p className={styles.title}>{build.name}</p>
							: <p className={styles.name_placeholder}>Build name</p>
						}
						<div className={styles.name_input}>
							<Input
								placeholder="Give it a name"
								value={build.name}
								onChange={e => setName(e.target.value.replace(/[^a-zA-Z&(\)\[\]\{\}\,\'\"\-+]+/ig, ''))} />
						</div>
						<div className={ext.exercise_exntension}>
							<p>Equipment: <span>{build.equipment.name}</span></p>
							<p>Muscle: <span>{build.muscle.name}</span></p>
							<p>Exercise: <span>{build.exercise.name}</span></p>
						</div>
					</>}
			</div>
		</>
	)
}

export default ExerciseBuilder
