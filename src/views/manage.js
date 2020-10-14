/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useReducer } from 'react'
import { isEmpty, remove, uniq } from 'lodash'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state/state'

import styles from '../styles/manage/manage.module.scss'
import check from '../images/check_black.png'

import Preview from '../components/manage/preview'
import Editor from '../components/manage/editor'
import Selector from '../components/manage/selector'
import Compose from '../components/manage/compose'
import Actionbar from '../components/actionbar/actionbar'
import ManageActions from '../components/manage/actions'

const initialState = {
	ext: {
		preview: false,
		select: false,
		edit: false,
	},
	preview: {},
	selection: []
};

function manageReducer(state, action) {
	switch (action.type) {
		case 'CLEAR_EXT':
			return {
				...state,
				ext: { ...initialState.ext }
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
					ext: { ...initialState.ext },
					selection: []
				}
				: {
					...state,
					ext: {
						...initialState.ext,
						select: true
					},
					preview: {}
				}
		case 'ALTER_SELECTION':
			return {
				...state,
				selection:
					state.selection.some(s => s.id === action.entity.id)
						? remove([...state.selection, action.entity], s => s.id !== action.entity.id)
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

const Manage = () => {
	const [{ compositions, composites }] = useStateValue()

	const [state, dispatch] = useReducer(manageReducer, initialState);

	const params = useParams()

	const [entities, setEntities] = useState([])

	const groups = { compositions, composites }

	useEffect(() => {
		setEntities(groups[params.group][params.entities])
		dispatch({ type: 'CLEAR_EXT' })
	}, [params])

	const set = (entity) => {
		if (state.ext.select) {
			dispatch({ type: 'ALTER_SELECTION', entity })
		} else {
			!isEmpty(state.preview) && state.preview.id === entity.id
				? dispatch({ type: 'TOGGLE_PREVIEW', entity: {} })
				: dispatch({ type: 'TOGGLE_PREVIEW', entity })
		}
	}

	let entityClass = (id) => {
		if (state.ext.select) {
			return styles.entity
		} else {
			if (state.preview.id === id) {
				return `${styles.entity} ${styles.active_entity}`
			} else {
				return styles.entity
			}
		}
	}

	useEffect(() => {
		console.log(state);
	}, [state])

	return (
		<>
			<Actionbar title={params.entities}>
				<ManageActions state={state} dispatch={dispatch} />
			</Actionbar>
			<div className={styles.manage}>
				<div className={styles.entities}>
					<div className={styles.actionbar_gap} />
					{entities.map((entity, i) => (
						<div key={i} className={styles.entity_cont}>
							<div className={entityClass(entity.id)} onClick={() => set(entity)}>
								{state.selection.some(s => s.id === entity.id) &&
									<img src={check} alt="" />
								}
								<div><p>{entity.name}</p></div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.extension}>
					{Object.keys(state.ext).every(k => state.ext[k] === false) && <Compose />}
					{state.ext.preview && <Preview entity={state.preview} />}
					{state.ext.edit && <Editor entity={state.preview} />}
					{state.ext.select && <Selector selection={state.selection} />}
				</div>
			</div>
		</>
	)
}

export default Manage