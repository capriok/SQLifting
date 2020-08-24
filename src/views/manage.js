/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import useActiveByPath from '../utils/useActiveByPath'
import useManagerActions from '../utils/useManagerActions'

import styles from '../styles/manage.module.scss'

import Preview from '../components/preview'
import Editor from '../components/editor'
import Selector from '../components/selector'


const Manage = () => {
	const [{
		actionState,
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
		setEntities(activeByPath.group[activeByPath.entity])
	}, [active])

	const set = (entity) => {
		if (selector.state === true) return addToSelection(entity)
		dispatch({
			type: 'MANAGER_ACTION',
			manager: {
				...manager,
				preview: {
					group: entity.group,
					table: entity.table,
					entity
				}
			}
		})
	}

	let entityClass = (id) => {
		return manager.preview.entity.id === id ? `${styles.entity} ${styles.activeENT}` : styles.entity
	}

	return (
		<>
			<div className={styles.manage}>
				<div className={styles.entities}>
					{entities.map((entity, i) => (
						<div key={i} className={styles.cont}>
							<div className={entityClass(entity.id)} onClick={() => set(entity)}>
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
						: <Preview />
				}
			</div>
		</>
	)
}

export default Manage
