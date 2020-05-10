import React from 'react'
import { useStateValue } from '../state'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import reset from '../gallery/reset.png'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

const ExerciseBuilder = ({ build }) => {
  const [{ data, exercises }, dispatch] = useStateValue()
  return (
    <>
      <div className="exercise-builder">
        {build.name && <>
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
              <img src={reset} alt="" />
            </Tooltip>
          </div>
        </>}
        <h1 className="ex-title">Build exercise</h1>
        <div className="ex-namer">
          <h1 className="type-title">Name this exercise</h1>
          <form onSubmit={() => { }}>
            <Input placeholder="Enter name" />
            <Button text="Submit" />
          </form>
        </div>
        <h1 className="type-title">Choose Equipment</h1>
        <div className="type-map">
          {data.equipment.map((item, i) => (
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
        <h1 className="type-title">Choose Exercise</h1>
        <div className="type-map">
          {data.exercises.map((item, i) => (
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
        <h1 className="type-title">Choose Muscle</h1>
        <div className="type-map">
          {data.muscles.map((item, i) => (
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
