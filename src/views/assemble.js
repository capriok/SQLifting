/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import Stepper from "../components/assemble/stepper";
import Exercises from '../components/assemble/builders/exercises'
import Circuits from '../components/assemble/builders/circuits'
import Workouts from '../components/assemble/builders/workouts'

const Assemble = () => {
	const [{
		composites,
		compositions,
		assemble: {
			active,
			steps,
			activeStep
		}
	},] = useStateValue()

	const {
		fullReset,
		setSteps,
		setActiveEntities
	} = useAssembleActions()

	useEffect(() => { return () => fullReset() }, [])

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
				<div className={styles.stepper_gap} />
				<Stepper />
			</div>
			<div className={styles.assemble}>
				{active.entity === 'excos'
					? <Exercises />
					: active.entity === 'circs'
						? <Circuits />
						: active.entity === 'wocos'
							? <Workouts />
							: <> </>
				}
			</div>
		</>
	)
}

export default Assemble
