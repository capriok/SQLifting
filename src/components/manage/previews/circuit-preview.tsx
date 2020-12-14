import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/common/ext-preview.module.scss'

interface Props {
	preview: any
}

const CircuitPreview: React.FC<Props> = ({ preview }) => (
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
)

export default CircuitPreview
