import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/manage/preview.module.scss'

const CircuitPreview = ({ entity }) => {
	return (
		<>
			<div className={styles.preview}>
				<p className={view.title}>{entity.name}</p>
				<p className={styles.dep}>Movements</p>
				<ul>
					{entity.deps.map((dep, i) => (
						<li key={i} className={styles.detail}>
							{dep.name}: <span>{dep.duration}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default CircuitPreview
