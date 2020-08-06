/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import { Input } from 'godspeed'
import { Tooltip } from 'react-tippy'

import submit from '../gallery/submit.png'
import reset from '../gallery/reset.png'

// import useUpdate from '../hooks/useUpdate.js';
import useRadioControl from '../hooks/useRadioControl';
import useReset from '../hooks/useReset';

const ExerciseBuilder = () => {
  const [{
    user: { details: { uid } },
    compositions: { equipments, muscles, exercises }
  },] = useStateValue()

  const [build, setBuild] = useState({
    id: undefined,
    name: '',
    equipment: undefined,
    muscle: undefined,
    exercise: undefined
  })
  // const update = useUpdate()
  const { controlEXRadio } = useRadioControl(build, setBuild)
  const resetAll = useReset()

  const inputRef = useRef()

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
      equipments: undefined,
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
        .post(process.env.REACT_APP_POST + '/exco', {
          name: build.name,
          uid: uid,
          eq_id: build.equipment.id,
          mu_id: build.muscle.id,
          ex_id: build.exercise.id
        })
        .then(() => {
          console.log('Post Success!')
          // updatePopulation('composites', ['excos'])
          setBuild({})
          resetAll()
          inputRef.current = ''
        })
        .catch(e => console.log(e))
    } else alert('All fields required.')
  }

  const createMap = (arr, prop) => (
    <div className="type-map">
      {arr.length > 0
        ? arr.map((item, i) => (
          <div className="item" key={i}>
            <div className="shift">
              <label className="label">
                <Input className="input" type="radio" checked={item.checked}
                  onChange={() => controlEXRadio(i, prop)} />
                <div className="item-name">{item.name}</div>
              </label>
            </div>
          </div>
        ))
        : <div className="item">
          <p className="shift no-res">No Results</p>
        </div>
      }
    </div>
  )

  useEffect(() => { build.name && console.log(build) }, [build])

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
                  ? <p className="type">{build.equipment.name}</p>
                  : <div className="type-placeholder-wrapper">
                    <div className="type-placeholder"></div>
                  </div>
              }
              {
                build.muscle !== undefined
                  ? <p className="type">{build.muscle.name}</p>
                  : <div className="type-placeholder-wrapper"><div className="type-placeholder"
                    style={{ animationName: 'nameAnim', backgroundColor: '#b1b1b1' }}></div></div>
              }
              {
                build.exercise !== undefined
                  ? <p className="type">{build.exercise.name}</p>
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
            <Input placeholder="Enter name"
              onChange={e => {
                inputRef.current = e.target.value
                setBuild({ ...build, name: inputRef.current })
              }} />
          </div>
        </div>
        <h1 className="type-title">Choose Equipment</h1>
        {createMap(equipments, 'equipments')}
        <h1 className="type-title">Choose Muscle</h1>
        {createMap(muscles, 'muscles')}
        <h1 className="type-title">Choose Exercise</h1>
        {createMap(exercises, 'exercises')}
      </div>
    </>
  )
}

export default ExerciseBuilder
