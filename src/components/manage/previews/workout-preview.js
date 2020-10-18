import React from 'react'

import view from '../../../styles/manage/manage.module.scss'
import styles from '../../../styles/common/ext-preview.module.scss'

const WorkoutPreview = ({ preview }) => {
	return (
		<>
			<div className={styles.preview}>
				<p className={view.title}>{preview.name}</p>
				<p className={styles.dep}>Exercises</p>
				<ul>
					{preview.exercises.map((dep, i) => (
						<div key={i}>
							<li className={styles.detail}>{dep.name}</li>
							<ul>
								<li>Sets: <span>{dep.sets}</span></li>
								<li>Reps: <span>{dep.reps}</span></li>
								<li>Weight: <span>{dep.weight}</span></li>
							</ul>
						</div>
					))}
				</ul>
				<p className={styles.dep}>Circuits</p>
				{preview.circuits.length > 0
					? <>
						<ul>
							{preview.circuits.map((dep, i) => {
								return (
									<div key={i}>
										<li className={styles.detail}>
											{dep.name}: <span>{dep.sets} {dep.sets === 1 ? 'Set' : 'Sets'}</span>
										</li>
										<ul>
											{dep.deps.map((dep, i) => (
												<li key={i}>{dep.name}: <span>{dep.duration}</span></li>
											))}
										</ul>
									</div>
								)
							})}
						</ul>
					</>
					: <><ul><span>None</span></ul></>}
			</div>
		</>
	)
}

export default WorkoutPreview
