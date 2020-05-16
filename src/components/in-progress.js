import React, { useState, useEffect } from 'react'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import Timer from './timer'

const InProgress = ({ workout }) => {
  const [wo, setWo] = useState(workout)
  useEffect(() => {
    const copy = wo
    copy.workout.forEach(ex => ex.strike = false);
    setWo(copy)
  }, [])

  useEffect(() => { console.log(workout) }, [workout])

  const strikeExercise = (i) => {
    const copy = wo.workout
    copy[i].strike = !copy[i].strike
    setWo({
      ...wo,
      workout: copy
    })
  }

  return (
    <div className="in-progress">
      <div className="header">
        <h1 className="ip-title">In Progress</h1>
        <div className="ip-timer"><Timer /></div>
      </div>
      {wo.workout.map((ex, i) => (
        <>
          <div className="workout-item" key={i}>
            <p className={ex.strike ? "item-title strike" : "item-title"}>{ex.name}</p>
            <div className="item">
              <div className="item-details">
                <label>
                  <Input type="checkbox" onChange={() => strikeExercise(i)} />
                </label>
                <div>
                  <p>Equipment: {ex.exercise.equipment}</p>
                  <p>Movement: {ex.exercise.exercise}</p>
                </div>
              </div>
              <div className="item-count">
                <div><span>Reps: </span><span>{ex.reps}</span></div>
                <div><span>Sets: </span><span>{ex.sets}</span></div>
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