import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import CountSetter from './count-setter'
import { Tooltip } from 'react-tippy'
import submit from '../gallery/submit.png'
import reset from '../gallery/reset.png'

import useBoxControl from '../hooks/useBoxControl';
import useUpdatePopulation from '../hooks/useUpdatePopulation';
import useReset from '../hooks/useReset';

const WorkoutBuilder = () => {
  const [{ user, exercises, workouts }, dispatch] = useStateValue()
  const [build, setBuild] = useState({
    name: undefined,
    workout: []
  })
  const updatePopulation = useUpdatePopulation()
  const { controlWOCheckbox } = useBoxControl(build, setBuild)
  const resetAll = useReset()

  const user_id = user.details.user_id

  const inputRef = useRef('')
  useEffect(() => {
    resetAll()
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
    resetAll()
    setBuild({
      name: undefined,
      workout: []
    })
  }

  const submitBuild = (e) => {
    e.preventDefault()
    if (build.name && build.workout.length > 0) {
      axios
        .post(process.env.REACT_APP_POST + '/builtworkouts', {
          user_id: user_id,
          name: build.name,
          workout: build.workout
        })
        .then(() => {
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
      resetAll()
      inputRef.current = ''
    } else alert('Somethings missing.')
  }

  useEffect(() => { build.workout.length > 0 && console.log('Workout Build', build) }, [build])

  return (
    <>
      <div className="workout-builder">
        <div className="wo-title">Workout Viewer</div>
        <div className="viewer">
          {build.name
            ? <h1 className="view-title">{build.name}</h1>
            : <div className="name-placeholder"></div>
          }
          {
            build.workout.length > 0
              ? build.workout.map((build, i) => (
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
              ))
              : <div className="view-item-placeholder">
                <div className="item-title-placeholder"></div>
                <div className="item-setter-placeholder">
                  <div className="reps-placeholder">
                    <span></span>
                  </div>
                  <div className="sets-placeholder">
                    <span></span>
                  </div>
                </div>
              </div>
          }
          <div className="viewer-actions">
            <Tooltip
              title="Reset build"
              position="bottom"
              trigger="mouseenter">
              <img src={reset} alt="" className="viewer-action-img" onClick={() => resetBuild()} />
            </Tooltip>
            <Tooltip
              title="Submit build"
              position="bottom"
              trigger="mouseenter">
              <img src={submit} alt="" className="viewer-action-img" onClick={(e) => submitBuild(e)} />
            </Tooltip>
          </div>
        </div>
        <div className="wo-title">Build Workout</div>
        <div className="wo-namer">
          <h1 className="type-title">Name this workout</h1>
          <div>
            <Input placeholder="Enter name" value={inputRef.current}
              onChange={e => {
                inputRef.current = e.target.value
                setBuild({ ...build, name: inputRef.current })
              }} />
          </div>
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
