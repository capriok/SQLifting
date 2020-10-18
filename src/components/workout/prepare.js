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
			setWorkoutEXs(woco.exercises)
			setWorkoutCIs(woco.circuits)
			console.log('%cActive Workout', 'color: lightskyblue', { woco })
		}
	}, [composites.workouts, paramID])

	useEffect(() => {
		if (!isEmpty(workout)) {
			const newWorkout = { ...workout }
			newWorkout.exercises = workoutEXs
			newWorkout.circuits = workoutCIs
			setWorkout(newWorkout)
			console.log('%cPrepared Workout', 'color: lightskyblue', { newWorkout })
		}
	}, [EXdrag.dragging, CIdrag.dragging])

	function onEXDragStart(e, index, id) {
		setEXdrag({ ...EXdrag, current: workoutEXs[index], dragging: true })
		e.dataTransfer.effectAllowed = 'move'
		e.dataTransfer.setData('text/html', e.target.parentNode)
	}

	function onEXDragOver(index) {
		if (!EXdrag.dragging) return
		setEXdrag({ ...EXdrag, over: workoutEXs[index] })
		if (EXdrag.current === EXdrag.over) {
			return
		}
		let newEXs = workoutEXs.filter(item => item !== EXdrag.current)
		newEXs.splice(index, 0, EXdrag.current)
		setWorkoutEXs(newEXs)
	}

	function onEXDragEnd() {
		setEXdrag(INIT_DRAG)
	}

	function onCIDragStart(e, index, id) {
		setCIdrag({ ...CIdrag, current: workoutCIs[index], dragging: true })
		e.dataTransfer.effectAllowed = 'move'
		e.dataTransfer.setData('text/html', e.target.parentNode)
	}

	function onCIDragOver(index) {
		if (!CIdrag.dragging) return
		setCIdrag({ ...CIdrag, over: workoutCIs[index] })
		if (CIdrag.current === CIdrag.over) {
			return
		}
		let newCIs = workoutCIs.filter(item => item !== CIdrag.current)
		newCIs.splice(index, 0, CIdrag.current)
		setWorkoutCIs(newCIs)
	}

	function onCIDragEnd() {
		setCIdrag(INIT_DRAG)
	}

	function EXClass(id) {
		return EXdrag.current.id === id
			? `${styles.entity} ${styles.dragging}`
			: styles.entity
	}

	function CIClass(id) {
		return CIdrag.current.id === id
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
						{workoutEXs.map((ent, i) => (
							<div
								key={i}
								className={EXClass(ent.id)}
								onDragOver={() => onEXDragOver(i)}>
								<div className={styles.entity_title}>{ent.name}</div>
								<div className={styles.details}>
									<div>{ent.sets} Sets</div>
									<div>{ent.reps} Reps</div>
									<div>{ent.weight} lbs</div>
								</div>
								<div
									className={styles.handle}
									draggable={true}
									onDragStart={e => onEXDragStart(e, i, ent.id)}
									onDragEnd={e => onEXDragEnd(e)}>
									☰
								</div>
							</div>
						))}
					</div>
					{workoutCIs.length > 0 &&
						<div className={styles.entities} draggable={false}>
							<h2 className={styles.entities_title}>Circuits</h2>
							{workoutCIs.map((ent, i) => (
								<div
									key={i}
									className={CIClass(ent.id)}
									onDragOver={() => onCIDragOver(i)}>
									<div className={styles.entity_title}>{ent.name}</div>
									<div className={styles.details}>
										<div>{ent.sets} Sets</div>
									</div>
									<div
										className={styles.handle}
										draggable={true}
										onDragStart={e => onCIDragStart(e, i, ent.id)}
										onDragEnd={e => onCIDragEnd(e)}>
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
