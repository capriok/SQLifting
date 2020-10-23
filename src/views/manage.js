/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect, useReducer } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../global/state'

import { manageState, manageReducer } from '../components/manage/state/manage-reducer'

import styles from '../styles/manage/manage.module.scss'
import ent from '../styles/common/entities.module.scss'
import check from '../assets/check_black.png'

import Preview from '../components/manage/preview'
import Editor from '../components/manage/editor'
import Selector from '../components/manage/selector'
import Compose from '../components/manage/compose'
import Actionbar from '../components/actionbar/actionbar'
import ManageActions from '../components/manage/actions'

const Manage = ({ params }) => {
	const [globalState] = useStateValue()
	const [state, dispatch] = useReducer(manageReducer, manageState);
	const [entities, setEntities] = useState([])
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setSuccess(false)
		}, 3000);
	}, [success])

	useEffect(() => {
		setEntities(globalState[params.group][params.entities])
		return () => { dispatch({ type: 'RESET' }) }
	}, [params])

	function set(entity) {
		state.ext.select
			? dispatch({ type: 'ALTER_SELECTION', entity })
			: !isEmpty(state.preview) && state.preview.id === entity.id
				? dispatch({ type: 'TOGGLE_PREVIEW', entity: {} })
				: dispatch({ type: 'TOGGLE_PREVIEW', entity })
	}

	function entityClass(id) {
		return state.ext.select
			? ent.entity
			: state.preview.id === id
				? `${ent.entity} ${ent.active_entity}`
				: ent.entity
	}

	const props = {
		state, dispatch,
		preview: state.preview, selection: state.selection,
		success, setSuccess
	}

	return (
		<>
			<Actionbar title={params.entities}>
				<ManageActions {...props} />
			</Actionbar>
			<div className={styles.manage}>
				<div className={ent.entities}>
					{entities.map((entity, i) => (
						<div key={i} className={ent.entity_cont}>
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
					{Object.keys(state.ext).every(k => state.ext[k] === false) && <Compose {...props} />}
					{state.ext.preview && <Preview {...props} />}
					{state.ext.edit && <Editor {...props} />}
					{state.ext.select && <Selector {...props} />}
				</div>
			</div>
		</>
	)
}

export default Manage