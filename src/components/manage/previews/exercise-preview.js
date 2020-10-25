import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/common/ext-preview.module.scss'

const ExercisePreview = ({ preview }) => {
	return (
		<>
			<div className={styles.preview}>
				<p className={view.title}>{preview.name}</p>
				<p className={styles.dep}>Equipment: <span>{preview.deps.equipment}</span></p>
				<p className={styles.dep}>Muscle: <span>{preview.deps.muscle}</span></p>
				<p className={styles.dep}>Exercise: <span>{preview.deps.exercise}</span></p>
			</div>
		</>
	)
}

export default ExercisePreview
