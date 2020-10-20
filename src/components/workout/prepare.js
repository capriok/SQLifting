/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../global/state'
import styles from '../../styles/workout/prepare.module.scss'

const Prepare = ({ params }) => {
	const paramID = parseInt(params.id)

	const [{ composites }] = useStateValue()

	const [workout, setWorkout] = useState({})

	const INIT_DRAG = {
		dragging: false,
		current: {},
		over: null
	}
	const [EXdrag, setEXdrag] = useState(INIT_DRAG)
	const [CIdrag, setCIdrag] = useState(INIT_DRAG)

	useEffect(() => {
		let woco = composites.workouts.find(w => w.id === paramID)
		if (!isEmpty(woco)) {
			setWorkout(woco)
			console.log('%cActive Workout', 'color: lightskyblue', { workout: woco })
		}
	}, [composites.workouts, paramID])

	function onDragStart(e, index, setter, obj, arr) {
		setter({ ...obj, current: arr[index], dragging: true })
		e.dataTransfer.effectAllowed = 'move'
		e.dataTransfer.setData('text/html', e.target.parentNode)
	}

	function onEXDragOver(index) {
		if (!EXdrag.dragging) return
		setEXdrag({ ...EXdrag, over: workout.exercises[index] })
		if (EXdrag.current === EXdrag.over) return
		let newArr = workout.exercises.filter(item => item !== EXdrag.current)
		newArr.splice(index, 0, EXdrag.current)
		setWorkout({ ...workout, exercises: newArr })
	}

	function onCIDragOver(index) {
		if (!CIdrag.dragging) return
		setCIdrag({ ...CIdrag, over: workout.circuit[0].deps[index] })
		if (CIdrag.current === CIdrag.over) return
		let newArr = workout.circuit[0].deps.filter(item => item !== CIdrag.current)
		newArr.splice(index, 0, CIdrag.current)
		setWorkout({ ...workout, circuit: [{ ...workout.circuit[0], deps: newArr }] })
	}

	function onDragEnd(setter) {
		setter(INIT_DRAG)
	}

	function exClass(id) {
		return EXdrag.current.id === id
			? `${styles.ex_entity} ${styles.dragging}`
			: styles.ex_entity
	}

	function ciClass(id) {
		return CIdrag.current.id === id
			? styles.dragging
			: null
	}

	if (isEmpty(workout)) return <></>

	return (
		<div className={styles.prepare}>
			{workout
				? <>
					<h1 className={styles.workout_title}>{workout.name}</h1>
					<div className={styles.entities} draggable={false}>
						<h2 className={styles.entities_title}>Exercises</h2>
						{workout.exercises.map((ent, i) => (
							<div
								key={i}
								className={exClass(ent.id)}
								onDragOver={() => onEXDragOver(i)}>
								<div className={styles.entity_main}>
									<p>{ent.name}</p>
									<ul>
										<li>Equipment: <span>{ent.deps.equipment}</span></li>
										<li>Exercise: <span>{ent.deps.exercise}</span></li>
										<li>Muscle: <span>{ent.deps.muscle}</span></li>
									</ul>
								</div>
								<div className={styles.details}>
									<div>{ent.sets} {ent.sets === 1 ? 'Set' : 'Sets'}</div>
									<div>{ent.reps} {ent.sets === 1 ? 'Rep' : 'Reps'}</div>
									<div>{ent.weight} lbs</div>
								</div>
								<div
									className={styles.handle}
									draggable={true}
									onDragStart={e => onDragStart(e, i, setEXdrag, EXdrag, workout.exercises)}
									onDragEnd={() => onDragEnd(setEXdrag)}>
									☰
								</div>
							</div>
						))}
					</div>
					{workout.circuit.length > 0 &&
						<div className={styles.entities} draggable={false}>
							<h2 className={styles.entities_title}>Circuit</h2>
							{workout.circuit.map((ent, i) => (
								<div key={i} className={styles.ci_entity}>
									<div className={styles.entity_main}>
										<p>{ent.name} <span>{ent.sets} {ent.sets === 1 ? 'Set' : 'Sets'}</span> </p>
										<ul className={styles.dep_ul}>
											{ent.deps.map((dep, i) => (
												<li
													key={i}
													className={ciClass(dep.id)}
													onDragOver={() => onCIDragOver(i)}>
													<p>{dep.name}: <span>{dep.duration}</span></p>
													<div
														className={styles.handle}
														draggable={true}
														onDragStart={e => onDragStart(e, i, setCIdrag, CIdrag, workout.circuit[0].deps)}
														onDragEnd={() => onDragEnd(setCIdrag)}>
														☰
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					}
				</>
				: <center style={{ width: '100%' }}>
					<p>No Workout Found</p>
				</center>
			}
		</div>
	)
}

export default Prepare
