import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import { Tooltip } from 'react-tippy'
import start from '../gallery/start.png'

const BuiltWorkouts = ({ updatePopulation, controlBWRadio, workout }) => {
  const [{ workouts }, dispatch] = useStateValue()

  return (
    <>
      <div className="built-workouts">
        {workout.workout.length > 0 &&
          <div className="viewer">
            <h1 className="bw-title">Workout Viewer</h1>
            <h1 className="type-title">{workout.name}</h1>
            {workout.workout.map((workout, i) => (
              <>
                <div className="workout-item" key={i}>
                  <p className="item-title">{workout.name}</p>
                  <div className="item">
                    <div className="item-details">
                      <p>Equipment: {workout.exercise.equipment}</p>
                      <p>Movement: {workout.exercise.exercise}</p>
                    </div>
                    <div className="item-count">
                      <p>Reps: {workout.reps}</p>
                      <p>Sets: {workout.sets}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="viewer-actions">
              <Tooltip
                title="Start Workout"
                position="bottom"
                trigger="mouseenter">
                <Link to="/workout-in-progress"><img src={start} alt="" /></Link>
              </Tooltip>
            </div>
          </div>
        }
        <h1 className="bw-title">Choose a workout</h1>
        <h1 className="type-title">Built Workouts</h1>
        <div className="type-map">
          {workouts.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlBWRadio(i, item)} />
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