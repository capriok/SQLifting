import React from 'react'

import styles from '../styles/preview.module.scss'

const Preview = ({ preview, preview: { type, entType, ent } }) => {
	preview.type && console.log('%cPreviewing', 'color: lightskyblue', preview);
	if (type === 'composition') {
		return (
			<>
				<div className={styles.preview}>
					{ent.name && <p>{ent.name}</p>}
				</div>
			</>
		)
	} else if (type === 'composite') {
		if (entType === 'exercise') {
			return (
				<>
					<div className={styles.preview}>
						<p className={styles.title}>{ent.name}</p>
						<ul>
							<li className={styles.detail}>Equipment: <span>{ent.deps.equipment}</span></li>
							<li className={styles.detail}>Muscle: <span>{ent.deps.muscle}</span></li>
							<li className={styles.detail}>Exercise: <span>{ent.deps.exercise}</span></li>
						</ul>
					</div>
				</>
			)
		}
		if (entType === 'circuit') {
			return (
				<>
					<div className={styles.preview}>
						<p className={styles.title}>{ent.name}</p>
						<ul>
							{ent.deps.map((dep, i) => (
								<li key={i} className={styles.detail}>{dep.name}: <span>{dep.duration}</span></li>
							))}
						</ul>
					</div>
				</>
			)
		}
		if (entType === 'workout') {
			return (
				<>
					<div className={styles.preview}>
						<p className={styles.title}>{ent.name}</p>
						<p className={styles.dep}>Exercises</p>
						<ul>
							{ent.exco.map((dep, i) => (
								<div key={i}>
									<li className={styles.detail}>{dep.name}</li>
									<ul>
										<li className={styles.subdep}>Sets: <span>{dep.sets}</span></li>
										<li className={styles.subdep}>Reps: <span>{dep.reps}</span></li>
										<li className={styles.subdep}>Weight: <span>{dep.weight}</span></li>
									</ul>
								</div>
							))}
						</ul >
						<p className={styles.dep}>Circuits</p>
						<ul>
							{ent.circ.map((dep, i) => (
								<div key={i}>
									<li className={styles.detail}>{dep.name}: <span>{dep.reps}</span></li>
									<ul>
										{dep.deps.map((dep, i) => (
											<li key={i} className={styles.subdep}>{dep.name}: <span>{dep.duration}</span></li>
										))}
									</ul>
								</div>
							))}
						</ul>
					</div >
				</>
			)
		}
	} else { return <div className={styles.prevnull}></div> }
}

export default Preview
