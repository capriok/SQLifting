import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import useOutsideClick from '../../utils/useOutsideClick'

import styles from '../../styles/workout/actions.module.scss'

import { Button } from 'godspeed'
import { isEmpty } from 'lodash'

const WorkoutActions = ({ state }) => {

	const { preview } = state

	const history = useHistory()

	const atIndex = history.location.pathname === '/workout'
	const isActive = history.location.pathname === '/workout/active'

	const [confirming, setConfirming] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	})

	return (
		<div className={styles.workout_actions}>
			<>
				{confirming
					? <div ref={ref} style={{ marginRight: '10px' }}>
						<Button
							text="Are you sure?"
							className={styles.warn}
							onClick={() => { history.push('/workout'); setConfirming(false) }} />
					</div>
					: <Button
						text={isActive ? 'End Workout' : 'Back'}
						onClick={() => { setConfirming(true) }}
						disabled={atIndex} />
				}
				<div>
					<Button
						text="Prepare"
						onClick={() => {
							history.push(`/workout/${preview.id}/prepare`)
						}}
						disabled={isEmpty(preview) || !atIndex} />
					<Button
						text="Start Workout"
						onClick={() => history.push(`/workout/active`)}
						disabled={atIndex || isActive} />
				</div>
			</>
		</div>
	)
}

export default WorkoutActions
