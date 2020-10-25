/*eslint no-unused-vars: "off"*/
import { uniq, remove } from 'lodash'

export const workoutState = {
	preview: {}
}

export function workoutReducer(state, action) {
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
