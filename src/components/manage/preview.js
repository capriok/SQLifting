/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { Route, useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/preview.module.scss'

const Preview = () => {
	const [{
		options: { tipsOption },
		manage: {
			preview: {
				entity
			}
		}
	}] = useStateValue()

	const params = useParams()

	useEffect(() => {
		(entity && !isEmpty(entity)) && console.log('%cPreviewing', 'color: lightskyblue', entity);
	}, [entity])

	if (!entity) {
		let tip = params.entities === 'excos' ? 'Exercises' : 'Circuits'
		return (
			<>
				<div className={styles.preview}>
					<p className={view.title}>Select an entity to preview</p>
				</div>
				{ params.entities !== 'wocos' &&
					tipsOption && <center>{tip} are used to assemble Workouts</center>
				}
			</>
		)
	}
	return (
		<>
			{params.entity && <>
				<Route path='/manage/compositions' render={() => (
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
				)} />
				<Route path='/manage/composites/exercises' render={() => (
					<div className={styles.preview}>
						<p className={view.title}>{entity.name}</p>
						<p className={styles.dep}>Equipment: <span>{entity.deps.equipment}</span></p>
						<p className={styles.dep}>Muscle: <span>{entity.deps.muscle}</span></p>
						<p className={styles.dep}>Exercise: <span>{entity.deps.exercise}</span></p>
					</div>
				)} />
				<Route path='/manage/composites/circuits' render={() => (
					<div className={styles.preview}>
						<p className={view.title}>{entity.name}</p>
						<p className={styles.dep}>Movements</p>
						<ul>
							{entity.deps.map((dep, i) => (
								<li key={i} className={styles.detail}>
									{dep.name}: <span>{dep.duration}</span>
								</li>
							))}
						</ul>
					</div>
				)} />
				<Route path='/manage/composites/workouts' render={() => (
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
				)} />
			</>}
		</>
	)
}

export default Preview
