/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import { Tooltip } from 'react-tippy'
import submit from '../gallery/submit.png'
import reset from '../gallery/reset.png'

import useRadioControl from '../hooks/useRadioControl';
import useUpdatePopulation from '../hooks/useUpdatePopulation';
import useReset from '../hooks/useReset';

const ExerciseBuilder = () => {
  const [{ user, data, exercises }, dispatch] = useStateValue()
  const [build, setBuild] = useState({
    id: undefined,
    name: '',
    equipment: undefined,
    muscle: undefined,
    exercise: undefined
  })
  const updatePopulation = useUpdatePopulation()
  const { controlEXRadio } = useRadioControl(build, setBuild)
  const resetAll = useReset()

  const inputRef = useRef()

  const user_id = user.details.user_id

  useEffect(() => {
    resetAll()
    setBuild({
      id: undefined,
      name: undefined,
      equipment: undefined,
      muscle: undefined,
      exercise: undefined
    })
  }, [])

  const resetBuild = () => {
    resetAll()
    setBuild({
      id: undefined,
      name: undefined,
      equipment: undefined,
      muscle: undefined,
      exercise: undefined
    })
  }

  const submitBuild = (e) => {
    e.preventDefault()
    const buildValues = Object.values(build)
    let hasUndefined = false
    buildValues.forEach((v) => {
      if (v === undefined) hasUndefined = true
    })
    if (!hasUndefined) {
      axios
        .post(process.env.REACT_APP_POST + '/builtexercise', {
          user_id: user_id,
          name: build.name,
          equipment: build.equipment,
          muscle: build.muscle,
          exercise: build.exercise
        })
        .then(() => {
          console.log('Post Success!')
          updatePopulation('exercises')
        })
        .catch(e => console.log(e))
      dispatch({
        type: 'EXaction',
        exercises: [
          ...exercises,
          {
            id: exercises.length + 1,
            name: build.name,
            equipment: build.equipment,
            muscles: build.muscle,
            exercises: build.exercise
          }
        ]
      })
      setBuild({})
      resetAll()
      inputRef.current = ''
    } else alert('All fields required.')
  }

  useEffect(() => { build.name && console.log('Exercise Build', build) }, [build])

  return (
    <>
      <div className="exercise-builder">
        <div className="viewer">
          <h1 className="ex-title">Exercise Viewer</h1>
          {build.name
            ? <h1 className="ex-name">{build.name}</h1>
            : <div className="name-placeholder"></div>
          }
          <div className="view">
            <div className="view-types">
              <p className="view-title">Equipment</p>
              <p className="view-title">Muscle</p>
              <p className="view-title">Exercise</p>
            </div>
            <div className="type-items">
              {
                build.equipment !== undefined
                  ? <p className="type">{build.equipment}</p>
                  : <div className="type-placeholder-wrapper">
                    <div className="type-placeholder"></div>
                  </div>
              }
              {
                build.muscle !== undefined
                  ? <p className="type">{build.muscle}</p>
                  : <div className="type-placeholder-wrapper"><div className="type-placeholder"
                    style={{ animationName: 'nameAnim', backgroundColor: '#b1b1b1' }}></div></div>
              }
              {
                build.exercise !== undefined
                  ? <p className="type">{build.exercise}</p>
                  : <div className="type-placeholder-wrapper">
                    <div className="type-placeholder"></div>
                  </div>
              }
            </div>
          </div>
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
        <h1 className="ex-title">Build exercise</h1>
        <div className="ex-namer">
          <h1 className="type-title">Name this exercise</h1>
          <div>
            <Input placeholder="Enter name" value={inputRef.current}
              onChange={e => {
                inputRef.current = e.target.value
                setBuild({ ...build, name: inputRef.current })
              }} />
          </div>
        </div>
        <h1 className="type-title">Choose Equipment</h1>
        <div className="type-map">
          {data.equipment.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlEXRadio(i, 'equipment')} />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <h1 className="type-title">Choose Muscle</h1>
        <div className="type-map">
          {data.muscles.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label" >
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlEXRadio(i, 'muscles')} />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <h1 className="type-title">Choose Exercise</h1>
        <div className="type-map">
          {data.exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label" >
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlEXRadio(i, 'exercises')} />
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
