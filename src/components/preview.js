import React from 'react'

import styles from '../styles/preview.module.scss'

const Preview = ({ preview: { type, entType, ent } }) => {
	type && console.log('%cPreviewing', 'color: lightskyblue', ent);
	if (type === 'composition') {
		return (
			<>
				<div className={styles.preview}>
					<p className={styles.title}>{ent.name}</p>
					<p className={styles.detail}>Occurrences</p>
					<ul>
						{ent.occ.length > 0
							? ent.occ.map((occ, i) => <li key={i}><span>{occ}</span></li>)
							: <span>None</span>
						}
					</ul>
				</div>
			</>
		)
	} else if (type === 'composite') {
		if (entType === 'exercise') {
			return (
				<>
					<div className={styles.preview}>
						<p className={styles.title}>{ent.name}</p>
						<p className={styles.detail}>Equipment: <span>{ent.deps.equipment}</span></p>
						<p className={styles.detail}>Muscle: <span>{ent.deps.muscle}</span></p>
						<p className={styles.detail}>Exercise: <span>{ent.deps.exercise}</span></p>
					</div>
				</>
			)
		}
		if (entType === 'circuit') {
			return (
				<>
					<div className={styles.preview}>
						<p className={styles.title}>{ent.name}</p>
						{ent.deps.map((dep, i) => (
							<p key={i} className={styles.detail}>{dep.name}: <span>{dep.duration}</span></p>
						))}
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
										<li>Sets: <span>{dep.sets}</span></li>
										<li>Reps: <span>{dep.reps}</span></li>
										{dep.weight && <li>Weight: <span>{dep.weight}</span></li>}
									</ul>
								</div>
							))}
						</ul>
						{ent.circ.length > 0 && <>
							<p className={styles.dep}>Circuits</p>
							<ul>
								{ent.circ.map((dep, i) => {
									let amount = parseInt(dep.reps)
									let reps = amount === 1 ? 'round' : 'rounds'
									return (
										<div key={i}>
											<li className={styles.detail}>{dep.name}: <span>{amount} {reps}</span></li>
											<ul>
												{dep.deps.map((dep, i) => (
													<li key={i}>{dep.name}: <span>{dep.duration}</span></li>
												))}
											</ul>
										</div>
									)
								})}
							</ul>
						</>}
					</div>
				</>
			)
		}
	} else { return <div className={styles.prevnull}></div> }
}

export default Preview
