/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { useStateValue } from '../state'

import styles from '../styles/preview.module.scss'

const Preview = () => {
	const [{
		manager: {
			preview: {
				group,
				table,
				entity
			}
		}
	}] = useStateValue()
	useEffect(() => {
		Object.keys(entity).length > 0 && console.log('%cPreviewing', 'color: lightskyblue', entity);
	}, [])
	switch (group) {
		case 'compositions':
			return (
				<>
					<div className={styles.preview}>
						<p className={styles.title}>{entity.name}</p>
						<p className={styles.detail}>Occurrences</p>
						<ul>
							{entity.occ.length > 0
								? entity.occ.map((occ, i) => <li key={i}><span>{occ}</span></li>)
								: <span>None</span>
							}
						</ul>
					</div>
				</>
			)
		case 'composites':
			switch (table) {
				case 'exco':
					return (
						<div className={styles.preview}>
							<p className={styles.title}>{entity.name}</p>
							<p className={styles.detail}>Equipmentity: <span>{entity.deps.equipmentity}</span></p>
							<p className={styles.detail}>Muscle: <span>{entity.deps.muscle}</span></p>
							<p className={styles.detail}>Exercise: <span>{entity.deps.exercise}</span></p>
						</div>
					)
				case 'circ':
					return (
						<div className={styles.preview}>
							<p className={styles.title}>{entity.name}</p>
							{entity.deps.map((dep, i) => (
								<p key={i} className={styles.detail}>{dep.name}: <span>{dep.duration}</span></p>
							))}
						</div>
					)
				case 'woco':
					return (
						<div className={styles.preview}>
							<p className={styles.title}>{entity.name}</p>
							<p className={styles.dep}>Exercises</p>
							<ul>
								{entity.excos.map((dep, i) => (
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
							{entity.circs.length > 0 && <>
								<p className={styles.dep}>Circuits</p>
								<ul>
									{entity.circs.map((dep, i) => {
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
					)
				default:
					break;
			}
			break;
		default:
			return (
				<div className={styles.preview}>
					<p className={styles.title}>Select an entity to preview or edit</p>
				</div>
			)
	}
}

export default Preview
