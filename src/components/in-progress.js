/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'godspeed'
import Timer from './timer'

const InProgress = ({ workout }) => {
  const [wo, setWo] = useState(workout)

  const promptLeave = () => {
    if (window.confirm("Are you sure you want to leave, progress will not be saved.")) {
      window.location.pathname = '/workouts'
    } else { return }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => promptLeave()
  }, [])

  useEffect(() => {
    const copy = wo
    copy.workout.forEach(ex => ex.strike = false);
    setWo(copy)
  }, [])

  useEffect(() => {
    console.log(wo)
    if (wo.workout.length === 0) window.location.href = '/workouts'
  }, [workout])

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
      ))}
      <div className="footer">
        <Button text="Abort Workout"
          size="sm"
          onClick={() => promptLeave()} />
      </div>
    </div>
  )
}

export default InProgress