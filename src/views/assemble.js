/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useReducer } from 'react'
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

const assembleState = {
	steps: [],
	activeStep: 0,
	entities: [],
	readyForNext: false,
	currentBuild: '',
	exerciseBuild: {
		name: '',
		equipment: {},
		muscle: {},
		exercise: {},
	},
	circuitBuild: {
		name: '',
		movements: []
	},
	workoutBuild: {
		name: '',
		exercises: [],
		movements: [],
	}
}

function assembleReducer(state, action) {
	switch (action.type) {
		case 'RESET_BUILDER':
			return {
				...assembleState
			}
		case 'SET_STEPS':
			return {
				...state,
				steps: action.steps,
				currentBuild: action.currentBuild
			}
		case 'SET_ENTITIES':
			return {
				...state,
				entities: state.steps[state.activeStep].entity
			}
		case 'INC_ACTIVESTEP':
			return {
				...state,
				activeStep: state.activeStep + 1,
				readyForNext: false
			}
		case 'DEC_ACTIVESTEP':
			return {
				...state,
				activeStep: state.activeStep - 1,
				readyForNext: true
			}
		case 'EXERCISE_NAME':
			return {
				...state,
				exerciseBuild: {
					...state.exerciseBuild,
					name: action.name
				}
			}
		case 'CIRCUIT_NAME':
			return {
				...state,
				circuitBuild: {
					...state.circuitBuild,
					name: action.name
				}
			}
		case 'WORKOUT_NAME':
			return {
				...state,
				workoutBuild: {
					...state.workoutBuild,
					name: action.name
				}
			}

		case 'ALTER_EX_BUILD':
			return {
				...state,
				readyForNext: true,
				exerciseBuild: {
					...state.exerciseBuild,
					[state.steps[state.activeStep].name]: action.entity
				}
			}
		case 'ALTER_CI_BUILD':
			return {
				...state,

			}
		case 'ALTER_WO_BUILD':
			return {
				...state,

			}
		default:
			console.error('Invalid Action Type');
			break;
	}
}

const Assemble = ({ params }) => {
	const [{
		composites,
		compositions,
	},] = useStateValue()

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
			<div className={styles.stepper}>
				<div className={styles.stepper_gap} />
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
