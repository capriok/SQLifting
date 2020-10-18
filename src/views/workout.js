/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect, useReducer } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useStateValue } from '../global/state'
// import { workoutState, workoutReducer } from '../components/workout/state/workout-reducer'
import { uniq, remove, isEmpty } from 'lodash'

import styles from '../styles/workout/workout.module.scss'
import ent from '../styles/common/entities.module.scss'

import Prepare from '../components/workout/prepare'
import WorkoutPreview from '../components/workout/workout-preview'
import Actionbar from '../components/actionbar/actionbar'

import WorkoutActions from '../components/workout/actions'

const Workout = () => {

	const workoutState = {
		preview: {}
	}

	function workoutReducer(state, action) {
		switch (action.type) {
			case 'RESET':
				return {
					...workoutState
				}
			case 'SET_PREVIEW':
				return {
					...state,
					preview: action.entity
				}
			default:
				console.error('Invalid Action Type')
				break;
		}
	}

	const [{ composites }] = useStateValue()

	const [state, dispatch] = useReducer(workoutReducer, workoutState)

	const history = useHistory()

	const { preview } = state

	useEffect(() => {
		dispatch({ type: 'RESET' })
	}, [history.location.pathname])

	function setPreview(entity) {
		dispatch({
			type: 'SET_PREVIEW',
			entity
		})
	}

	function entityClass(id) {
		return preview && id === preview.id
			? `${ent.entity} ${ent.active_entity}`
			: `${ent.entity}`
	}

	const props = { state, dispatch, preview }

	return (
		<>
			<Actionbar title="Workouts">
				<WorkoutActions {...props} />
			</Actionbar>
			<div className={styles.workout}>
				<Route exact path='/workout' render={() => (
					<>
						<div className={ent.entities}>
							<div className={styles.actionbar_gap} />
							{composites.workouts.map((entity, i) => (
								<div key={i} className={ent.entity_cont}>
									<div
										className={entityClass(entity.id)}
										onClick={() => setPreview(entity)}>
										<div><p>{entity.name}</p></div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.extension}>
							{!isEmpty(preview)
								? <WorkoutPreview preview={preview} />
								: <div className={styles.preview}>
									<p className={styles.title}>Select an workout to prepare</p>
								</div>
							}
						</div>
					</>)} />
				<Route path='/workout/:id/prepare' render={(props) => (
					<Prepare params={props.match.params} />
				)} />
			</div>
		</>
	)
}

export default Workout
