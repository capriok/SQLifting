/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../state/state'
import useActiveByPath from '../utils/useActiveByPath'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import Stepper from "../components/assemble/stepper";

import check from '../images/check_black.png'

const Assemble = () => {
	const [{
		compositions: {
			equipments,
			muscles,
			exercises,
			movements
		},
		composites: {
			excos,
			circs
		},
		assemble,
		assemble: {
			steps,
			active,
			activeStep
		}
	}, dispatch] = useStateValue()

	let stps = []
	switch (active.entity) {
		case 'excos':
			stps = [
				{ name: 'Equipment', label: 'Choose Equipment', entity: equipments },
				{ name: 'Muscles', label: 'Choose Muscle', entity: muscles },
				{ name: 'Exercise', label: 'Choose Exercise', entity: exercises },
				{ name: 'Review', label: 'Review', entity: [] },
			]
			break;
		case 'circs':
			stps = [
				{ name: 'Movements', label: 'Choose Movements', entity: movements },
				{ name: 'Review', label: 'Review', entity: [] },
			]
			break;
		case 'wocos':
			stps = [
				{ name: 'Exercises', label: 'Choose Exercises', entity: excos },
				{ name: 'Circuits', label: 'Choose Circuits', entity: circs },
				{ name: 'Review', label: 'Review', entity: [] },
			]
			break;
		default:
			break;
	}

	const [entities, setEntities] = useState(stps[0].entity)

	useEffect(() => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				steps: stps
			}
		})
	}, [])

	useEffect(() => {
		if (!isEmpty(stps[activeStep].entity)) {
			setEntities(stps[activeStep].entity)
		}
	}, [active])

	useEffect(() => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				steps: stps,
				activeStep: 0
			}
		})
	}, [active.entity])

	useEffect(() => {
		if (steps.length > 0) {
			setEntities(steps[activeStep].entity)
		}
	}, [activeStep])

	return (
		<>
			<div className={styles.stepper}>
				<Stepper />
			</div>
			<div className={styles.assemble}>
				{activeStep < steps.length
					? <>
						<div className={styles.entities}>
							{entities.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div className={styles.entity} >
										{/* {selector.selection.some(s => s.id === entity.id) && <img src={check} alt="" />} */}
										<div><p>{entity.name}</p></div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.extension}>
							<p className={styles.title}>extension</p>
						</div>
					</>
					: <>
						<h1>Review</h1>
					</>
				}
			</div>
		</>
	)
}

export default Assemble
