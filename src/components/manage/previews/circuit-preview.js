import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/common/ext-preview.module.scss'

const CircuitPreview = ({ preview }) => {
	return (
		<>
			<div className={styles.preview}>
				<p className={view.title}>{preview.name}</p>
				<p className={styles.dep}>Movements</p>
				<ul>
					{preview.deps.map((dep, i) => (
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
