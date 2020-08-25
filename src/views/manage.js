/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import useActiveByPath from '../utils/useActiveByPath'
import useManagerActions from '../utils/useManagerActions'

import styles from '../styles/manage/manage.module.scss'
import main from '../styles/manage/main.module.scss'
import check from '../gallery/check_black.png'

import Preview from '../components/manage/preview'
import Editor from '../components/manage/editor'
import Selector from '../components/manage/selector'
import Compose from '../components/manage/compose'


const Manage = () => {
	const [{
		manager,
		manager: {
			active,
			preview,
			editor,
			selector
		}
	},
		dispatch] = useStateValue()
	const activeByPath = useActiveByPath()
	const { fullReset, addToSelection } = useManagerActions()
	const [entities, setEntities] = useState([])
	useEffect(() => {
		fullReset()
	}, [entities])

	useEffect(() => {
		setEntities(activeByPath.groupState[activeByPath.entity])
	}, [active])

	const set = (entity) => {
		if (selector.state === true) return addToSelection(entity)
		if (preview.entity && preview.entity.id === entity.id) {
			console.log('hit');
			return dispatch({
				type: 'MANAGER_ACTION',
				manager: {
					...manager,
					preview: {
						state: false,
					}
				}
			})
		}
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				preview: {
					state: true,
					group: entity.group,
					table: entity.table,
					entity: entity
				},
				editor: { state: false }
			}
		})
	}

	let entityClass = (id) => {
		if (selector.state === true) {
			return main.entity
		} else {
			if (preview.entity && manager.preview.entity.id === id) {
				return `${main.entity} ${main.active_entity}`
			} else {
				return main.entity
			}
		}
	}

	return (
		<>
			<div className={styles.manage}>
				<div className={styles.entities}>
					{entities.map((entity, i) => (
						<div key={i} className={main.entity_cont}>
							<div className={entityClass(entity.id)} onClick={() => set(entity)}>
								{selector.selection.some(s => s.id === entity.id) && <img src={check} alt="" />}
								<p>{entity.name}</p>
							</div>
						</div>
					))}
					{/* <div className={styles.cont}><div className={styles.entity}><p>test</p></div></div> */}
				</div>
				{editor.state
					? <Editor />
					: selector.state
						? <Selector />
						: preview.state
							? <Preview />
							: <Compose />
				}
			</div>
		</>
	)
}

export default Manage
