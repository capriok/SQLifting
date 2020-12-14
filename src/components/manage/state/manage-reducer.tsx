import { isEmpty, remove, uniq } from 'lodash'

export const manageState: ManageState = {
	ext: {
		preview: false,
		select: false,
		edit: false,
	},
	preview: {},
	selection: []
};

export function manageReducer(state: any, action: any) {
	switch (action.type) {
		case 'RESET':
			return {
				...manageState,
			}
		case 'TOGGLE_PREVIEW':
			return {
				...state,
				ext: {
					...state.ext,
					preview: isEmpty(action.entity) ? false : true,
					edit: false
				},
				preview: action.entity
			}
		case 'TOGGLE_EDIT':
			return {
				...state,
				ext: state.ext.edit
					? {
						...state.ext,
						edit: false,
						preview: true,
					}
					: {
						...state.ext,
						edit: true,
						preview: false,
					}
			}
		case 'TOGGLE_SELECT':
			return state.ext.select
				? {
					...state,
					ext: { ...manageState.ext },
					selection: []
				}
				: {
					...state,
					ext: {
						...manageState.ext,
						select: true
					},
					preview: {}
				}
		case 'ALTER_SELECTION':
			return {
				...state,
				selection:
					state.selection.some(s => s.id === action.entity.id)
						? remove(
							[...state.selection, action.entity],
							s => s.id !== action.entity.id
						)
						: uniq([...state.selection, action.entity])
			}
		case 'RESET_SELECTION':
			return {
				...state,
				ext: { ...state.ext, select: false },
				selection: []
			}
		default:
			console.error('Invalid Action Type');
			break;
	}
}