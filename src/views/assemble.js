/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useEffect, useReducer } from 'react'
import { useStateValue } from '../global/state'
import { assembleState, assembleReducer } from '../components/assemble/state/assemble-reducer'

import styles from '../styles/assemble/assemble.module.scss'

import ActionBar from '../components/actionbar/actionbar'
import AssembleActions from '../components/assemble/actions'
import Stepper from "../components/assemble/stepper";
import ExerciseBuilder from '../components/assemble/builders/exercise-builder'
import CircuitBuilder from '../components/assemble/builders/circuit-builder'
import WorkoutBuilder from '../components/assemble/builders/workout-builder'

const Assemble = ({ params }) => {
	const [{ composites, compositions }] = useStateValue()

	const [state, dispatch] = useReducer(assembleReducer, assembleState)

	const steps = {
		exercises: [
			{ name: 'equipment', label: 'Equipment', entity: compositions.equipments },
			{ name: 'muscle', label: 'Muscle', entity: compositions.muscles },
			{ name: 'exercise', label: 'Exercise', entity: compositions.exercises }
		],
		circuits: [
			{ name: 'movements', label: 'Movements', entity: compositions.movements },
			{ name: 'Detail', label: 'Detail', entity: [] }
		],
		workouts: [
			{ name: 'exercises', label: 'Exercises', entity: composites.exercises },
			{ name: 'circuits', label: 'Circuits', entity: composites.circuits },
			{ name: 'Detail', label: 'Detail', entity: [] }
		]
	}

	useEffect(() => {
		dispatch({
			type: 'SET_STEPS',
			steps: steps[params.entities],
			currentBuild: `${params.entities.slice(0, -1)}Build`
		})
		return () => { dispatch({ type: 'RESET' }) }
	}, [compositions, composites, params])

	useEffect(() => {
		state.steps.length > 0 && dispatch({ type: 'SET_ENTITIES' })
	}, [state.steps, state.activeStep])

	const props = { state, dispatch }

	return (
		<>
			<ActionBar title={params.entities}>
				<AssembleActions {...props} />
			</ActionBar>
			<div className={styles.stepper_wrapper}>
				<Stepper {...props} />
			</div>
			<div className={styles.assemble}>
				{params.entities === 'exercises' && <ExerciseBuilder {...props} />}
				{params.entities === 'circuits' && <CircuitBuilder {...props} />}
				{params.entities === 'workouts' && <WorkoutBuilder {...props} />}
			</div>
		</>
	)
}

export default Assemble
