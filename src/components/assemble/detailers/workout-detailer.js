import React from 'react'

import styles from '../../../styles/assemble/detailers/workout-detailer.module.scss'

import { Input } from 'godspeed'

const WorkoutDetailer = ({ state, dispatch }) => {

	const { workoutBuild: build } = state

	function setDetailByProp(prop, type, val, i) {
		if (val === '') val = 0
		dispatch({
			type: 'DETAIL_WO_BUILD',
			prop: prop,
			detail: { [type]: parseFloat(val) },
			index: i
		})
	}

	return (
		<>
			<div className={styles.workout_detailer}>
				<div className={styles.detailer_cont}>
					<h1>Workout details</h1>
					<div className={styles.details}>
						<h2>{build.exercises.length > 1 ? 'Exercises' : 'Exercise'}</h2>
						{build.exercises.map((exco, i) => (
							<div className={styles.detail} key={i}>
								<p>{exco.name}</p>
								<div>
									<Input
										// onWheel={() => console.log('wheel')}
										type="number"
										min={0}
										step={2}
										placeholder="Sets"
										onChange={e => setDetailByProp('exercises', 'sets', e.target.value, i)} />
									<Input
										// onWheel={() => console.log('wheel')}
										type="number"
										min={0}
										step={2}
										placeholder="Reps"
										onChange={e => setDetailByProp('exercises', 'reps', e.target.value, i)} />
									<Input
										// onWheel={() => console.log('wheel')}
										type="number"
										min={0}
										step={2}
										placeholder="Weight"
										onChange={e => setDetailByProp('exercises', 'weight', e.target.value, i)} />
								</div>
							</div>
						))}
					</div>
					<div className={styles.details}>
						{build.circuit.length === 0
							? <></>
							: build.circuit.length > 1
								? <h2>Circuits</h2>
								: <h2>Circuit</h2>
						}
						{build.circuit.map((circ, i) => (
							<div className={styles.detail} key={i}>
								<p>{circ.name}</p>
								<div>
									<Input
										// onWheel={() => console.log('wheel')}
										type="number"
										min={0}
										step={2}
										placeholder="Sets"
										onChange={e => setDetailByProp('circuit', 'sets', e.target.value, i)} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default WorkoutDetailer
