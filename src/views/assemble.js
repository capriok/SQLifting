/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect, useReducer } from 'react'
import { useStateValue } from '../global/state'

import styles from '../styles/assemble/assemble.module.scss'

import ActionBar from '../components/actionbar/actionbar'
import AssembleActions from '../components/assemble/actions'
import Stepper from "../components/assemble/stepper";
import ExerciseBuilder from '../components/assemble/builders/exercise-builder'
import CircuitBuilder from '../components/assemble/builders/circuit-builder'
import WorkoutBuilder from '../components/assemble/builders/workout-builder'
import { intersection, remove, uniq } from 'lodash'

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
		circuits: [],
	}
}

function assembleReducer(state, action) {
	switch (action.type) {
		case 'RESET':
			return {
				...assembleState
			}
		case 'READY':
			return {
				...state,
				readyForNext: action.state
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
		case 'BUILD_NAME':
			if (state.currentBuild === '') return { ...state }
			return {
				...state,
				[state.currentBuild]: {
					...state[state.currentBuild],
					name: action.name
				}
			}
		case 'ALTER_EX_BUILD':
			const EXbuildProp = state.steps[state.activeStep].name
			return {
				...state,
				readyForNext: true,
				exerciseBuild: {
					...state.exerciseBuild,
					[EXbuildProp]: action.entity
				}
			}
		case 'ALTER_CI_BUILD':
			return {
				...state,
				readyForNext: action.state,
				circuitBuild: {
					...state.circuitBuild,
					movements: state.circuitBuild.movements.some(m => m.id === action.entity.id)
						? remove([...state.circuitBuild.movements, action.entity], m => m.id !== action.entity.id)
						: uniq([...state.circuitBuild.movements, action.entity])
				}
			}
		case 'DETAIL_CI_BUILD':
			return {
				...state,
				circuitBuild: {
					...state.circuitBuild,
					movements: state.circuitBuild.movements.map((mov, i) =>
						i === action.index
							? { ...mov, ...action.detail }
							: mov
					)
				}
			}
		case 'ALTER_WO_BUILD':
			const WObuildProp = state.steps[state.activeStep].name
			return {
				...state,
				readyForNext: action.state,
				workoutBuild: {
					...state.workoutBuild,
					[WObuildProp]:
						state.workoutBuild[WObuildProp].some(x => x.id === action.entity.id)
							? remove([...state.workoutBuild[WObuildProp], action.entity], x => x.id !== action.entity.id)
							: uniq([...state.workoutBuild[WObuildProp], action.entity])
				}
			}
		case 'DETAIL_WO_BUILD':
			return {
				...state,
				workoutBuild: {
					...state.workoutBuild,
					[action.prop]: state.workoutBuild[action.prop].map((x, i) =>
						i === action.index
							? { ...x, ...action.detail }
							: x
					)
				}
			}

		default:
			console.error('Invalid Action Type');
			break;
	}
}

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
