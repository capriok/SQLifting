import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import CountSetter from './count-setter'
import { Tooltip } from 'react-tippy'
import submit from '../gallery/submit.png'
import reset from '../gallery/reset.png'


const WorkoutBuilder = ({ controlWOCheckbox, updatePopulation, resetAllBoxes, build, setBuild }) => {
  const [{ user, data, exercises, workouts }, dispatch] = useStateValue()
  const user_id = user.details.user_id
  const [name, setName] = useState('')

  useEffect(() => {
    resetAllBoxes()
    setBuild({
      name: undefined,
      workout: []
    })
  }, [])

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

  const resetBuild = () => {
    resetAllBoxes()
    setName('')
    setBuild({
      name: undefined,
      workout: []
    })
  }

  const submitBuild = (e) => {
    e.preventDefault()
    if (build.name) {
      axios
        .post(process.env.REACT_APP_POST + '/builtworkouts', {
          user_id: user_id,
          name: build.name,
          workout: build.workout
        })
        .then((res) => {
          console.log('Post Success!')
          updatePopulation('workouts')
        })
        .catch(e => console.log(e))
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
      resetAllBoxes()
    } else alert('Name this workout.')
  }

  return (
    <>
      <div className="workout-builder">
        {(build.workout.length > 0 || build.name) && <>
          <div className="wo-title">Workout Viewer</div>
          <div className="viewer">
            <h1 className="view-title">{build.name}</h1>
            {build.workout.map((build, i) => (
              <div className="view-item" key={i}>
                <div className="item-title">{build.exercise.name}</div>
                <div className="item-setter">
                  <div className="reps">
                    <span>Reps</span>
                    <CountSetter
                      count={build.reps}
                      incrementer={() => increment(i, 'reps')}
                      decrementer={() => decrement(i, 'reps')}
                    />
                  </div>
                  <div className="sets">
                    <span>Sets</span>
                    <CountSetter
                      count={build.sets}
                      incrementer={() => increment(i, 'sets')}
                      decrementer={() => decrement(i, 'sets')}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="viewer-actions">
              <Tooltip
                title="Reset build"
                position="bottom"
                trigger="mouseenter">
                <img src={reset} alt="" onClick={() => resetBuild()} />
              </Tooltip>
              <Tooltip
                title="Submit build"
                position="bottom"
                trigger="mouseenter">
                <img src={submit} alt="" onClick={(e) => submitBuild(e)} />
              </Tooltip>
            </div>
          </div>
        </>}
        <div className="wo-title">Build Workout</div>
        <div className="wo-namer">
          <h1 className="type-title">Name this workout</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            name && setBuild({ ...build, name: name })
            setName("")
          }} >
            <Input placeholder="Enter name"
              onChange={e => setName(e.target.value)} value={name} />
            <Button text="Submit" />
          </form>
        </div>
        <div className="type-title">Exercises</div>
        <div className="type-map">
          {exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked}
                    onChange={() => controlWOCheckbox(i, item.name)} />
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

export default WorkoutBuilder
