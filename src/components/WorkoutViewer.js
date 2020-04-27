import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import Button from 'godspeed/build/Button'
import NumberSetter from './numberSetter'

const WorkoutViewer = ({ build, setBuild }) => {
  const [{ workouts }, dispatch] = useStateValue()

  const submitBuild = () => {

    console.log(build);
  }

  const increment = (i, type) => {
    console.log(build);
    const copy = [...build]
    copy[i][type] = copy[i][type] + 1
    setBuild(copy)
  }

  const decrement = (i, type) => {
    if (build[i][type] === 1) return
    const copy = [...build]
    copy[i][type] = copy[i][type] - 1
    setBuild(copy)
  }

  useEffect(() => {
    console.log(workouts)
  }, [workouts])

  return (
    <>
      <h1>Viewer</h1>
      <div className="build">
        {build.map((build, i) => (
          <div className="workout-build" key={i}>
            <div className="name">{build.exercise}</div>
            <div className="setters">
              <div className="reps">
                <span>Reps</span>
                <NumberSetter
                  count={build.reps}
                  incrementer={e => increment(i, 'reps')}
                  decrementer={e => decrement(i, 'reps')}
                />
              </div>
              <div className="sets">
                <span>Sets</span>
                <NumberSetter
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