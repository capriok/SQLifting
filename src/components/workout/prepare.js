import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state/state'

import styles from '../../styles/workout/prepare.module.scss'

const Prepare = () => {
	const [{
		composites: {
			wocos
		}
	},] = useStateValue()

	const [workout, setWorkout] = useState({})

	const queryid = parseInt(window.location.pathname.split('/')[2])
	useEffect(() => {
		if (wocos.length > 0) {
			let woco = wocos.find(w => w.id === queryid)
			setWorkout(woco)
		}
	}, [wocos])

	useEffect(() => {
		!isEmpty(workout) && console.log('%cActive Workout', 'color: lightskyblue', { workout });
	}, [workout])

	return (
		<div className={styles.prepare}>
			<h1>{workout.name}</h1>
		</div>
	)
}

export default Prepare
