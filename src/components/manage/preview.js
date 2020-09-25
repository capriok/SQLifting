/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/preview.module.scss'

const Preview = () => {
	const [{
		options: { tipsOption },
		manage: {
			active,
			preview: {
				group,
				table,
				entity
			}
		}
	}] = useStateValue()

	useEffect(() => {
		(entity && !isEmpty(entity)) && console.log('%cPreviewing', 'color: lightskyblue', entity);
	}, [])

	switch (group) {
		case 'compositions':
			return (
				<>
					<div className={view.extension}>
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
					</div>
				</>
			)
		case 'composites':
			switch (table) {
				case 'exco':
					return (
						<div className={view.extension}>
							<div className={styles.preview}>
								<p className={view.title}>{entity.name}</p>
								<p className={styles.dep}>Equipment: <span>{entity.deps.equipment}</span></p>
								<p className={styles.dep}>Muscle: <span>{entity.deps.muscle}</span></p>
								<p className={styles.dep}>Exercise: <span>{entity.deps.exercise}</span></p>
							</div>
						</div>
					)
				case 'circ':
					return (
						<div className={view.extension}>
							<div className={styles.preview}>
								<p className={view.title}>{entity.name}</p>
								<p className={styles.dep}>Movements</p>
								<ul>
									{entity.deps.map((dep, i) => (
										<li key={i} className={styles.detail}>{dep.name}: <span>{dep.duration}</span></li>
									))}
								</ul>
							</div>
						</div>
					)
				case 'woco':
					return (
						<div className={view.extension}>
							<div className={styles.preview}>
								<p className={view.title}>{entity.name}</p>
								<p className={styles.dep}>Exercises</p>
								<ul>
									{entity.excos.map((dep, i) => (
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
								{entity.circs.length > 0
									? <>
										<ul>
											{entity.circs.map((dep, i) => {
												return (
													<div key={i}>
														<li className={styles.detail}>{dep.name}: <span>{dep.sets} sets</span></li>
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
						</div>
					)
				default:
					break;
			}
			break;
		default:
			return (
				<div className={view.extension}>
					<div className={styles.preview}>
						<p className={view.title}>Select an entity to preview</p>
					</div>
					{ active.table !== 'woco' &&
						tipsOption && <center>{active.name} are used to assemble Workouts</center>
					}
				</div>
			)
	}
}

export default Preview
