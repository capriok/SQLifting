import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import { Tooltip } from 'react-tippy'
import submit from '../gallery/submit.png'
import reset from '../gallery/reset.png'

const ExerciseBuilder = ({ updatePopulation, resetAllBoxes, controlEXRadio, build, setBuild }) => {
  const [{ data, exercises }, dispatch] = useStateValue()
  const [name, setName] = useState('')

  useEffect(() => {
    resetAllBoxes()
    setBuild({
      id: undefined,
      name: undefined,
      muscle: undefined,
      exercise: undefined,
      equipment: undefined,
    })
  }, [])

  const resetBuild = () => {
    updatePopulation()
    setName('')
    setBuild({
      id: undefined,
      name: undefined,
      muscle: undefined,
      exercise: undefined,
      equipment: undefined,
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
          name: build.name,
          equipment: build.equipment,
          muscle: build.muscle,
          exercise: build.exercise,
        })
        .then(res => console.log('Post Success!'))
        .catch(e => console.log(e))
      console.log('axios posted');
      dispatch({
        type: 'EXaction',
        exercises: [
          ...exercises,
          {
            id: exercises.length + 1,
            name: build.name,
            muscles: build.muscle,
            exercises: build.exercise,
            equipment: build.equipment,
          }
        ]
      })
      setBuild({})
    } else alert('All fields required.')
  }

  return (
    <>
      <div className="exercise-builder">
        {(build.id || build.name) &&
          <div className="viewer">
            <h1 className="ex-title">Exercise Viewer</h1>
            <h1 className="ex-name">{build.name}</h1>
            <div className="view">
              <div className="view-types">
                <p className="view-title">Equipment</p>
                <p className="view-title">Exercise</p>
                <p className="view-title">Muscle</p>
              </div>
              <div className="type-items">
                <p className="type">{build.equipment}</p>
                <p className="type">{build.exercise}</p>
                <p className="type">{build.muscle}</p>
              </div>
            </div>
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
        }
        <h1 className="ex-title">Build exercise</h1>
        <div className="ex-namer">
          <h1 className="type-title">Name this exercise</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            name && setBuild({ ...build, name: name })
            setName("")
          }} >
            <Input placeholder="Enter name" autoFocus
              onChange={e => setName(e.target.value)} value={name} />
            <Button text="Submit" />
          </form>
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
      </div>
    </>
  )
}

export default ExerciseBuilder
