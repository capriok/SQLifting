import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/common/ext-preview.module.scss'

const ExercisePreview = ({ entity }) => {
	return (
		<>
			<div className={styles.preview}>
				<p className={view.title}>{entity.name}</p>
				<p className={styles.dep}>Equipment: <span>{entity.deps.equipment}</span></p>
				<p className={styles.dep}>Muscle: <span>{entity.deps.muscle}</span></p>
				<p className={styles.dep}>Exercise: <span>{entity.deps.exercise}</span></p>
			</div>
		</>
	)
}

export default ExercisePreview
