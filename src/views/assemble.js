/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import Stepper from "../components/assemble/stepper";
import ExerciseBuilder from '../components/assemble/builders/exercise-builder'
import CircuitBuilder from '../components/assemble/builders/circuit-builder'
import WorkoutBuilder from '../components/assemble/builders/workout-builder'

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
					? <ExerciseBuilder />
					: active.entity === 'circs'
						? <CircuitBuilder />
						: active.entity === 'wocos'
							? <WorkoutBuilder />
							: <></>
				}
			</div>
		</>
	)
}

export default Assemble
