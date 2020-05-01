import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import Button from 'godspeed/build/Button'
import QuantitySetter from '../quantitysetter'

const WorkoutViewer = ({ build, setBuild }) => {
  const [{ workouts }, dispatch] = useStateValue()

  const submitBuild = () => {
    dispatch({
      type: 'WOaction',
      workouts: [
        ...workouts,
        { ...build }
      ]
    })
    setBuild({
      name: undefined,
      workout: []
    })
  }

  const increment = (i, type) => {
    const copy = { ...build.workout }
    copy[i][type] = copy[i][type] + 1
    setBuild({ ...build })
  }

  const decrement = (i, type) => {
    if (build.workout[i][type] === 1) return
    const copy = { ...build.workout }
    copy[i][type] = copy[i][type] - 1
    setBuild({ ...build })
  }

  return (
    <>
      <div className="build">
        <h1>{build.name}</h1>
        {build.workout.map((build, i) => (
          <div className="workout-build" key={i}>
            <div className="name">{build.exercise}</div>
            <div className="setters">
              <div className="reps">
                <span>Reps</span>
                <QuantitySetter
                  count={build.reps}
                  incrementer={e => increment(i, 'reps')}
                  decrementer={e => decrement(i, 'reps')}
                />
              </div>
              <div className="sets">
                <span>Sets</span>
                <QuantitySetter
                  count={build.sets}
                  incrementer={e => increment(i, 'sets')}
                  decrementer={e => decrement(i, 'sets')}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={e => {
        e.preventDefault()
        submitBuild()
      }}>
        <Button text="Submit"></Button>
      </form>
    </>
  )
}

export default WorkoutViewer