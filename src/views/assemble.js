/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import Stepper from "../components/assemble/stepper";

import check from '../images/check_black.png'

const Assemble = () => {
	const [{
		composites,
		compositions,
		assemble: {
			steps,
			active,
			activeStep,
			activeEntities
		}
	},] = useStateValue()

	const { fullReset, resetSteps, setSteps, setActiveEntities, addToBuild } = useAssembleActions()

	useEffect(() => { return () => fullReset() }, [])
	useEffect(() => { return () => resetSteps() }, [])

	useEffect(() => {
		setActiveEntities()
	}, [composites, compositions])

	useEffect(() => {
		setActiveEntities()
	}, [steps])

	useEffect(() => {
		setActiveEntities()
	}, [activeStep])

	useEffect(() => {
		setSteps()
	}, [active.entity])

	return (
		<>
			<div className={styles.stepper}>
				<Stepper />
			</div>
			<div className={styles.stepper_gap}></div>
			<div className={styles.assemble}>
				{activeStep < steps.length
					? <>
						<div className={styles.entities}>
							{activeEntities.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div className={styles.entity} onClick={() => addToBuild(entity)}>
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
