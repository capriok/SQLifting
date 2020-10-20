import { remove, uniq } from 'lodash'

export const assembleState = {
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
		circuit: [],
	}
}

export function assembleReducer(state, action) {
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
						? remove(
							[...state.circuitBuild.movements, action.entity],
							m => m.id !== action.entity.id
						)
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
							? remove(
								[...state.workoutBuild[WObuildProp], action.entity],
								x => x.id !== action.entity.id
							)
							: WObuildProp !== 'circuit'
								? uniq([...state.workoutBuild[WObuildProp], action.entity])
								: [action.entity]
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
