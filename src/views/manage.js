/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useManageActions from '../components/actionbar/useManageActions'

import styles from '../styles/manage/manage.module.scss'
import check from '../images/check_black.png'

import Preview from '../components/manage/preview'
import Editor from '../components/manage/editor'
import Selector from '../components/manage/selector'
import Compose from '../components/manage/compose'

const Manage = () => {
	const [{
		manage,
		manage: {
			active,
			preview,
			editor,
			selector
		}
	}] = useStateValue()
	const { fullReset, setPreview, addToSelection } = useManageActions()
	const [entities, setEntities] = useState([])

	useEffect(() => {
		fullReset()
	}, [entities])

	useEffect(() => {
		setEntities(active.groupState[active.entity])
	}, [active])

	useEffect(() => {
		return () => fullReset()
	}, [])

	const set = (entity) => {
		if (selector.state === true) return addToSelection(entity)
		setPreview(entity)
	}

	let entityClass = (id) => {
		if (selector.state === true) {
			return styles.entity
		} else {
			if (preview.entity && manage.preview.entity.id === id) {
				return `${styles.entity} ${styles.active_entity}`
			} else {
				return styles.entity
			}
		}
	}

	return (
		<>
			<div className={styles.manage}>
				<div className={styles.entities}>
					<div className={styles.actionbar_gap} />
					{entities.map((entity, i) => (
						<div key={i} className={styles.entity_cont}>
							<div className={entityClass(entity.id)} onClick={() => set(entity)}>
								{selector.selection.some(s => s.id === entity.id) && <img src={check} alt="" />}
								<div><p>{entity.name}</p></div>
							</div>
						</div>
					))}
					{/* <div className={styles.entity_cont}><div className={styles.entity}><div><p>test</p></div></div></div> */}
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