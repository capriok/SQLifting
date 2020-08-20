/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'godspeed'
import Timer from './timer'

const InProgress = (/*take in id*/) => {
  const [wo, setWo] = useState({ woco_excos: [] }) // delete this

  /*fetch woco and woco_excos/circs based on query id in path*/

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
    copy.woco_excos.forEach(ex => ex.strike = false);
    setWo(copy)
  }, [])

  const strikeExercise = (i) => {
    const copy = wo.woco_excos
    copy[i].strike = !copy[i].strike
    setWo({
      ...wo,
      workout: copy
    })
  }

  return (
    <div className="in-progress">
      <div className="header">
        <h1 className="ip-title">Uh oh, no worky</h1>
        <div className="ip-timer"><Timer /></div>
      </div>
      {wo.woco_excos.map((ex, i) => (
        <div className="workout-item" key={i}>
          <p className={ex.strike ? "item-title strike" : "item-title"}>{ex.name}</p>
          <div className="item">
            <div className="item-details">
              <label>
                <Input type="checkbox" onChange={() => strikeExercise(i)} />
              </label>
              <div>
                <p>Equipment: {ex.equipment}</p>
                <p>Exercise: {ex.exercise}</p>
                <p>Muscle: {ex.muscle}</p>
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