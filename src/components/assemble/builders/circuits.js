import React from 'react'
import { uniqBy, remove } from 'lodash'
import { useStateValue } from '../../../state/state'

import styles from '../../../styles/assemble/assemble.module.scss'
import ext from '../../../styles/assemble/extensions/circuits.module.scss'

import check from '../../../images/check_black.png'
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
		let updatedBuild = []
		if (build.movements !== undefined) {
			// if build has > 0 movements => spread movements and add entity
			updatedBuild = [...build.movements, entity]
			if (build.movements.some(s => s.id === entity.id)) {
				// If entity is already in build => remove it
				updatedBuild = remove(updatedBuild, s => s.id !== entity.id)
			} else {
				// Add selected entity to build and make sure its unique by id
				updatedBuild = uniqBy(updatedBuild, 'id')
			}
		} else {
			// if build has < 1 movements => only add entity
			updatedBuild = [entity]
		}
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				readyForNext: true,
				build: {
					movements: updatedBuild
				}
			}
		})
	}

	return (
		<>
			{
				activeStep < steps.length - 1
					? <>
						<div className={styles.entities}>
							{activeEntities.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div className={styles.entity} onClick={() => addToWorkoutBuild(entity)}>
										{build.movements !== undefined && build.movements.some(s => s.id === entity.id) && <img src={check} alt="" />}
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
								{(build.hasOwnProperty('movements') && build.movements.length > 0) && <>
									<p>Movements</p>
									<ul>
										{build.movements.map((mov, i) => <li key={i}><span>{mov.name}</span></li>)}
									</ul>
								</>}
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
