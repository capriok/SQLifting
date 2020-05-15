import React from 'react'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import Timer from './timer'
const InProgress = ({ resetAllBoxes, workout }) => {

  return (
    <div className="in-progress">
      <div className="header">
        <h1 className="ip-title">In Progress</h1>
        <div className="ip-timer"><Timer /></div>
      </div>
      {workout.workout.map((workout, i) => (
        <>
          <div className="workout-item" key={i}>
            <p className="item-title">{workout.name}</p>
            <div className="item">
              <div className="item-details">
                <label>
                  <Input type="checkbox" />
                </label>
                <div>
                  <p>Equipment: {workout.exercise.equipment}</p>
                  <p>Movement: {workout.exercise.exercise}</p>
                </div>
              </div>
              <div className="item-count">
                <div><span>Reps: </span><span>{workout.reps}</span></div>
                <div><span>Sets: </span><span>{workout.sets}</span></div>
              </div>
            </div>
          </div>
        </>
      ))}
      <div className="footer">
        <Button text="Cancel Workouts"
          size="xsm"
          to="/workouts"
          onClick={() => { }} />
      </div>
    </div>
  )
}

export default InProgress