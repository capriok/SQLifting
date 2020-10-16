/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'
import { uniqBy, remove } from 'lodash'
import { useStateValue } from '../../../global/state'

import check from '../../../assets/check_black.png'

import styles from '../../../styles/assemble/assemble.module.scss'
import ent from '../../../styles/common/entities.module.scss'
import ext from '../../../styles/assemble/extensions/circuit-extension.module.scss'

import { Input } from 'godspeed';
import CircuitDetailer from '../detailers/circuit-detailer'

const CircuitBuilder = ({ state, dispatch }) => {
	const { activeStep, steps, entities, circuitBuild: build } = state

	const [name, setName] = useState('')

	useEffect(() => {
		return dispatch({ type: 'RESET_BUILDER' })
	}, [])

	useEffect(() => {
		// dispatch({
		// 	type: 'ASSEMBLE_ACTION',
		// 	assemble: {
		// 		...assemble,
		// 		build: {
		// 			...build,
		// 			name: name
		// 		}
		// 	}
		// })
	}, [name])

	const addToCircuitBuild = (entity) => {
		// entity.durationValue = 0
		// entity.durationType = 'Reps'
		// let updatedBuild = []
		// // bool determines whether or not the Next button is disabled
		// let bool
		// if (build.movements.length > 0) {
		// 	// if build has > 0 movements => spread movements and add entity
		// 	updatedBuild = [...build.movements, entity]
		// 	if (build.movements.some(s => s.id === entity.id)) {
		// 		// If entity is already in build => remove it
		// 		updatedBuild = remove(updatedBuild, s => s.id !== entity.id)
		// 		if (build.movements.length === 1) {
		// 			// if build has 1 movement => bool = false
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
		// 	// if build has < 1 movements => only add entity
		// 	updatedBuild = [entity]
		// 	bool = true
		// }
		// dispatch({
		// 	type: 'ASSEMBLE_ACTION',
		// 	assemble: {
		// 		...assemble,
		// 		readyForNext: bool,
		// 		build: {
		// 			movements: updatedBuild
		// 		}
		// 	}
		// })
	}

	return (
		<>
			{activeStep < steps.length - 1
				? <>
					<div className={ent.entities}>
						{entities.map((entity, i) => (
							<div key={i} className={ent.entity_cont}>
								<div className={ent.entity} onClick={() => addToCircuitBuild(entity)}>
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
					<CircuitDetailer />
				</>
			}
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
				<div className={ext.circuit_exntension}>
					{build.movements.length > 0 && <>
						<p>Movements</p>
						<ul>
							{build.movements.map((mov, i) => (
								<li key={i} className={activeStep === 1 ? ext.li_bb : null}>
									<span>{mov.name}</span>
									{activeStep === 1 &&
										<span>{mov.durationValue} {mov.durationType}</span>
									}
								</li>
							))}
						</ul>
					</>}
				</div>
			</div>
		</>
	)
}

export default CircuitBuilder
