/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import check from '../images/check_black.png'

import Stepper from "../components/assemble/stepper";
import { Input, Button } from 'godspeed';
import { isEmpty } from 'lodash'
import Exercises from '../components/assemble/builders/exercises'
import Circuits from '../components/assemble/builders/circuits'
import Workouts from '../components/assemble/builders/workouts'

const Assemble = () => {
	const [{
		composites,
		compositions,
		assemble: {
			steps,
			active,
			activeStep,
			activeEntities,
			build
		}
	},] = useStateValue()

	const {
		fullReset,
		setSteps,
		setActiveEntities,
		addToBuild,
		submitBuild
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
				<Stepper />
			</div>
			<div className={styles.stepper_gap}></div>
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
