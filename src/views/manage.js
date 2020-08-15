/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'

import styles from '../styles/manage.module.scss'

import useActiveByPath from '../hooks/useActiveByPath'

const Manage = () => {
	const [{ active }] = useStateValue()
	const activeByPath = useActiveByPath()
	const [stage, setStage] = useState([])

	useEffect(() => {
		setStage(activeByPath.parent[activeByPath.entity])
	}, [active])

	return (
		<div className={styles.manage}>
			{stage.map((ent, i) => (
				<div className={styles.entity} key={i}><p>{ent.name}</p></div>
			))}
		</div>
	)
}

export default Manage
