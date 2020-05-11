import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import reset from '../gallery/reset.png'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

const ExerciseBuilder = ({ updatePopulation, controlRadio, build, setBuild }) => {
  const [{ data, exercises }, dispatch] = useStateValue()
  const [name, setName] = useState('')

  useEffect(() => {
    updatePopulation()
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

  return (
    <>
      <div className="exercise-builder">
        {(build.id || build.name) && <>
          <h1 className="ex-title">Exercise Viewer</h1>
          <div className="viewer">
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
            <Tooltip
              title="Reset build"
              position="bottom"
              trigger="mouseenter">
              <img src={reset} alt="" onClick={() => resetBuild()} />
            </Tooltip>
          </div>
        </>}
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
                <label className="label" key={i}>
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlRadio(i, 'equipment')} />
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
                <label className="label" key={i}>
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlRadio(i, 'exercises')} />
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
                <label className="label" key={i}>
                  <Input className="input" type="radio" checked={item.checked}
                    onChange={() => controlRadio(i, 'muscles')} />
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
