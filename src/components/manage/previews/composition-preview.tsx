import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/common/ext-preview.module.scss'

interface Props {
	preview: any
}

const CompositionPreview: React.FC<Props> = ({ preview }) => (
	<div className={styles.preview}>
		<p className={view.title}>{preview.name}</p>
		<p className={styles.dep}>Occurrences</p>
		<ul>
			{preview.occ.length > 0
				? preview.occ.map((occ, i) => <li key={i}><span>{occ}</span></li>)
				: <span>None</span>
			}
		</ul>
	</div>
)

export default CompositionPreview
