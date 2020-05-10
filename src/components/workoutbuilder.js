import React from 'react'
import { useStateValue } from '../state'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import QuantitySetter from './quantitysetter'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'


const ExerciseBuilder = ({ build }) => {
  const [{ data, exercises, workouts }, dispatch] = useStateValue()

  const increment = (i, type) => {
    // const copy = { ...build.workout }
    // copy[i][type] = copy[i][type] + 1
    // setBuild({ ...build })
  }

  const decrement = (i, type) => {
    // if (build.workout[i][type] === 1) return
    // const copy = { ...build.workout }
    // copy[i][type] = copy[i][type] - 1
    // setBuild({ ...build })
  }

  return (
    <>
      <div className="workout-builder">
        {build.name && <>
          <div className="wo-title">Workout Viewer</div>
          <div className="viewer">
            <h1 className="view-title">{build.name}</h1>
            {build.workout.map((build, i) => (
              <div className="view-item">
                <div className="item-title">{build.name}</div>
                <div className="item-setter">
                  <div className="reps">
                    <span>Reps</span>
                    <QuantitySetter
                      count={build.reps}
                      incrementer={() => increment(i, 'reps')}
                      decrementer={() => decrement(i, 'reps')}
                    />
                  </div>
                  <div className="sets">
                    <span>Sets</span>
                    <QuantitySetter
                      count={build.reps}
                      incrementer={() => increment(i, 'reps')}
                      decrementer={() => decrement(i, 'reps')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>}
        <div className="wo-title">Build Workout</div>
        <div className="wo-namer">
          <h1 className="type-title">Name this exercise</h1>
          <form onSubmit={() => { }}>
            <Input placeholder="Enter name" />
            <Button text="Submit" />
          </form>
        </div>
        <div className="type-title">Exercises</div>
        <div className="type-map">
          {exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label" key={i}>
                  <Input className="input" type="radio" />
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

export default ExerciseBuilder
