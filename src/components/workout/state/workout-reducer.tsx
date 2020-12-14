export const workoutState: WorkoutState = {
	preview: {}
}

export function workoutReducer(state: any, action: any) {
	switch (action.type) {
		case 'RESET':
			return {
				...workoutState
			}
		case 'SET_PREVIEW':
			return {
				...state,
				preview: action.entity
			}
		default:
			console.error('Invalid Action Type')
			break;
	}
}
