/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'

import styles from '../styles/manage.module.scss'

import Preview from '../components/preview'
import Editor from '../components/editor'

import useActiveByPath from '../utils/useActiveByPath'
import useActionBarActions from '../utils/useActionBarActions'

const Manage = () => {
	const [{ active, actionState }, dispatch] = useStateValue()
	const activeByPath = useActiveByPath()
	const { resetActionBarStates, setEditEntity } = useActionBarActions()
	const [entities, setEntities] = useState([])
	const [preview, setPreview] = useState({ type: '', entType: '', ent: {} })
	useEffect(() => {
		setPreview({ type: '', entType: '', ent: {} })
		resetActionBarStates()
	}, [entities])

	useEffect(() => {
		setEntities(activeByPath.parent[activeByPath.entity])
	}, [active])

	const set = (ent) => {
		const type = window.location.pathname.split('/')[2].slice(0, -1)
		const entType = window.location.pathname.split('/')[3].slice(0, -1)
		let entAndStuff = { type, entType, ent }
		setPreview(entAndStuff)
		setEditEntity('edit', {
			...actionState.edit,
			entity: entAndStuff
		})
	}

	let entityClass = (id) => {
		return preview.ent.id === id ? `${styles.entity} ${styles.activeENT}` : styles.entity
	}

	return (
		<>
			<div className={styles.manage}>
				<div className={styles.entities}>
					{entities.map((ent, i) => (
						<div key={i} className={styles.cont}>
							<div className={entityClass(ent.id)} onClick={() => set(ent)}>
								<p>{ent.name}</p>
							</div>
						</div>
					))}
					{/* <div className={styles.cont}><div className={styles.entity}><p>test</p></div></div> */}
				</div>
				{actionState.edit.state
					? <Editor />
					: <Preview preview={preview} />
				}
			</div>
		</>
	)
}

export default Manage
