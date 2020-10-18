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
	const [workoutEXs, setWorkoutEXs] = useState({})
	const [workoutCIs, setWorkoutCIs] = useState({})

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

	function onDragOver(index, setter, obj, arr) {
		if (!obj.dragging) return
		setter({ ...obj, over: workout[arr][index] })
		if (obj.current === obj.over) return
		let newArr = workout[arr].filter(item => item !== obj.current)
		newArr.splice(index, 0, obj.current)
		setWorkout({ ...workout, [arr]: newArr })
	}

	function onDragEnd(setter) {
		setter(INIT_DRAG)
	}

	function entClass(obj, ent) {
		return obj.current.id === ent.id && obj.current.name === ent.name
			? `${styles.entity} ${styles.dragging}`
			: styles.entity
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
								className={entClass(EXdrag, ent)}
								onDragOver={() => onDragOver(i, setEXdrag, EXdrag, 'exercises')}>
								<div className={styles.entity_main}>
									<p>{ent.name}</p>
									<ul>
										<li>Equipment: <span>{ent.deps.equipment}</span></li>
										<li>Muscle: <span>{ent.deps.muscle}</span></li>
										<li>Exercise: <span>{ent.deps.exercise}</span></li>
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
					{workout.circuits.length > 0 &&
						<div className={styles.entities} draggable={false}>
							<h2 className={styles.entities_title}>Circuits</h2>
							{workout.circuits.map((ent, i) => (
								<div
									key={i}
									className={entClass(CIdrag, ent)}
									onDragOver={() => onDragOver(i, setCIdrag, CIdrag, 'circuits')}>
									<div className={styles.entity_main}>
										<p>{ent.name}</p>
										{ent.deps.map((dep, i) => (
											<ul key={i}>
												<li>{dep.name}: <span>{dep.duration}</span></li>
											</ul>
										))}
									</div>
									<div className={styles.details}>
										<div>{ent.sets} {ent.sets === 1 ? 'Set' : 'Sets'}</div>
									</div>
									<div
										className={styles.handle}
										draggable={true}
										onDragStart={e => onDragStart(e, i, setCIdrag, CIdrag, workout.circuits)}
										onDragEnd={() => onDragEnd(setCIdrag)}>
										☰
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
