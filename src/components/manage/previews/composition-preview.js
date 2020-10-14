import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/manage/preview.module.scss'

const CompositionPreview = ({ entity }) => {
	return (
		<>
			<div className={styles.preview}>
				<p className={view.title}>{entity.name}</p>
				<p className={styles.dep}>Occurrences</p>
				<ul>
					{entity.occ.length > 0
						? entity.occ.map((occ, i) => <li key={i}><span>{occ}</span></li>)
						: <span>None</span>
					}
				</ul>
			</div>
		</>
	)
}

export default CompositionPreview
