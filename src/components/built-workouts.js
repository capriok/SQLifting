/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state'
import { Input } from 'godspeed'
import start from '../gallery/start.png'

import { Tooltip } from 'react-tippy'
// import DraggableArray from 'react-draggable-array'

import useRadioControl from '../hooks/useRadioControl';
import useReset from '../hooks/useReset';

const BuiltWorkouts = ({ workout, setWorkout }) => {
  const [{ user: { details: { uid } }, composites: { wocos } },] = useStateValue()
  const { controlBWRadio } = useRadioControl(undefined, undefined, setWorkout)
  const resetAll = useReset()

  useEffect(() => {
    return () => {
      setWorkout({
        id: undefined,
        name: undefined,
        deps: []
      })
    };
  }, [])

  useEffect(() => {
    resetAll()
  }, [])

  return (
    <>
      {/* <DraggableArray col className="draggable-cont"> */}
      {/* </DraggableArray> */}
      <div className="built-workouts">
        {workout.deps.length > 0 &&
          <div className="viewer">
            <h1 className="bw-title">Workout Viewer</h1>
            <h1 className="type-title">{workout.name}</h1>
            {workout.deps.excos.map((exercise, i) => (
              <div className="workout-item" key={i}>
                <p className="item-title">{exercise.name}</p>
                <div className="item">
                  <div className="item-details">
                    <p>Equipment: {exercise.equipment}</p>
                    <p>Movement: {exercise.exercise}</p>
                    <p>Muscle: {exercise.muscle}</p>
                  </div>
                  <div className="item-count">
                    <p>Reps: {exercise.reps}</p>
                    <p>Sets: {exercise.sets}</p>
                    <p>Weight: {exercise.weight}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="viewer-actions">
              <Tooltip
                title="Start Workout"
                position="bottom"
                trigger="mouseenter">
                <Link to="/workout-in-progress">
                  <img src={start} alt="" className="viewer-action-play-img" />
                </Link>
              </Tooltip>
            </div>
          </div>
        }
        <h1 className="bw-title">Choose a workout</h1>
        <h1 className="type-title">Built Workouts</h1>
        <div className="type-map">
          {wocos.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => { controlBWRadio(i, item); console.log(item); }} />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BuiltWorkouts