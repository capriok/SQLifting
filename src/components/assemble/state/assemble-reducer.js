/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { isEmpty, remove, uniq } from 'lodash'

export const assembleState = {

};

export function assembleReducer(state, action) {
	switch (action.type) {
		case 'CLEAR_EXT':
			return {

			}
		default:
			console.error('Invalid Action Type');
			break;
	}
}