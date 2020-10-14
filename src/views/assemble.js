/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { Route, useParams } from 'react-router-dom'
import { useStateValue } from '../global/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import ActionBar from '../components/actionbar/actionbar'
import AssembleActions from '../components/assemble/actions'
import Stepper from "../components/assemble/stepper";
import ExerciseBuilder from '../components/assemble/builders/exercise-builder'
import CircuitBuilder from '../components/assemble/builders/circuit-builder'
import WorkoutBuilder from '../components/assemble/builders/workout-builder'

const Assemble = () => {
	const [{
		composites,
		compositions,
		assemble: {
			steps,
			activeStep
		}
	},] = useStateValue()

	const params = useParams()

	const {
		fullReset,
		setSteps,
		setActiveEntities
	} = useAssembleActions()

	useEffect(() => { return () => fullReset() }, [])

	useEffect(() => {
		setActiveEntities()
	}, [composites, compositions, steps, activeStep])

	useEffect(() => {
		setSteps()
	}, [params.entities])

	return (
		<>
			<ActionBar title={params.entities}>
				<AssembleActions />
			</ActionBar>
			<div className={styles.stepper}>
				<div className={styles.stepper_gap} />
				<Stepper />
			</div>
			<div className={styles.assemble}>
				<Route path='/assemble/composites/exercises' component={ExerciseBuilder} />
				<Route path='/assemble/composites/circuits' component={CircuitBuilder} />
				<Route path='/assemble/composites/workouts' component={WorkoutBuilder} />
			</div>
		</>
	)
}

export default Assemble
