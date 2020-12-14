/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'

import check from '../../../assets/check_black.png'

import styles from '../../../styles/assemble/assemble.module.scss'
import ent from '../../../styles/common/entities.module.scss'
import ext from '../../../styles/assemble/extensions/circuit-extension.module.scss'
import ss from '../../../styles/common/submit-success.module.scss'

import { Input } from 'godspeed';
import CircuitDetailer from '../detailers/circuit-detailer'

interface Props {
	state: any
	dispatch: any
	success: SuccessState
}

const CircuitBuilder: React.FC<Props> = (props) => {
	const { steps, activeStep, entities, circuitBuild: build } = props.state
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
	}, [activeStep, build])

	function checkStep() {
		build.movements.length >= 3
			&& dispatch({ type: 'READY', state: true })
		activeStep === steps.length - 1
			&& dispatch({ type: 'READY', state: true })
	}

	function addToBuild(entity) {
		dispatch({
			type: 'ALTER_CI_BUILD',
			entity: {
				...entity,
				durationValue: 0,
				durationType: 'Reps'
			}
		})
	}

	return (
		<>
			{activeStep < steps.length - 1
				? <>
					<div className={ent.entities}>
						{entities.map((entity, i) => (
							<div key={i} className={ent.entity_cont}>
								<div className={ent.entity} onClick={() => addToBuild(entity)}>
									{build.movements.some(s => s.id === entity.id) &&
										<img src={check} alt="" />
									}
									<div><p>{entity.name}</p></div>
								</div>
							</div>
						))}
					</div>
				</>
				: <>
					<CircuitDetailer {...props} />
				</>
			}
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
						<div className={ext.circuit_exntension}>
							{build.movements.length > 0 && <>
								<p>Movements</p>
								<ul>
									{build.movements.map((mov, i) => (
										<li key={i} className={activeStep === 1 ? ext.li_bb : ''}>
											<span>{mov.name}</span>
											{activeStep === 1 &&
												<span>{mov.durationValue} {mov.durationType}</span>
											}
										</li>
									))}
								</ul>
							</>}
						</div>
					</>}
			</div>
		</>
	)
}

export default CircuitBuilder
