import React, { useState, useRef } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import unselect from '../gallery/unselect.png'
import trash from '../gallery/trash.png'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
const Manager = ({ updatePopulation }) => {
  const [{ data, exercises, workouts }, dispatch] = useStateValue()

  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')
  const [equipment, setEquipment] = useState('')

  const ref = useRef()

  const InsertIntoDatabase = (type, payload) => {
    axios
      .post(process.env.REACT_APP_POST + `/${type}data`,
        { [type]: payload })
      .then(res => {
        console.log(res)
        updatePopulation()
      })
  }

  const formSubmit = e => {
    e.preventDefault();
    if (!equipment && !exercise && !muscle) {
      return console.log('returning');
    }
    let isDupe = false
    if (equipment) {
      data.equipment.forEach(e => { if (e.name === equipment) isDupe = true });
      if (equipment && !isDupe) {
        InsertIntoDatabase('equipment', equipment)
        setEquipment("")
      }
    } else if (exercise) {
      data.exercises.forEach(e => { if (e.name === exercise) isDupe = true });
      if (exercise && !isDupe) {
        InsertIntoDatabase('exercise', exercise)
        setExercise("")
      }
    } else {
      data.muscles.forEach(m => { if (m.name === muscle) isDupe = true });
      if (muscle && !isDupe) {
        InsertIntoDatabase('muscle', muscle)
        setMuscle("")
      }
    }
  }

  return (
    <>
      <div className="db-manager">
        <h1 className="db-title">Add Compositions <span>One at a time</span></h1>
        <div className="add-compositions">
          <form id="add-composition-form" onSubmit={e => (formSubmit(e))}>
            <Input placeholder="Add Equipment" value={equipment}
              onChange={e => { (!exercise && !muscle) && setEquipment(e.target.value) }} />
            <Input placeholder="Add Exercise" value={exercise}
              onChange={e => { (!equipment && !muscle) && setExercise(e.target.value) }} />
            <Input placeholder="Add Muscle" value={muscle}
              onChange={e => { (!equipment && !exercise) && setMuscle(e.target.value) }} />
          </form>
          <Button text="Submit" type="submit" form="add-composition-form" />
        </div>
        <h1 className="db-title">Compositions</h1>
        <div className="type">
          <span className="type-title">Equipment</span>
          <span className="type-action">
            <Tooltip
              title="Cancel selection"
              position="bottom"
              trigger="mouseenter">
              <img src={unselect} alt="" />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt="" />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {data.equipment.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="type">
          <span className="type-title">Exercises</span>
          <span className="type-action">
            <Tooltip
              title="Cancel selection"
              position="bottom"
              trigger="mouseenter">
              <img src={unselect} alt="" />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt="" />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {data.exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="type">
          <span className="type-title">Muscles</span>
          <span className="type-action">
            <Tooltip
              title="Cancel selection"
              position="bottom"
              trigger="mouseenter">
              <img src={unselect} alt="" />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt="" />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {data.exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <h1 className="db-title">Composites</h1>
        <div className="type">
          <span className="type-title">Exercises</span>
          <span className="type-action">
            <Tooltip
              title="Cancel selection"
              position="bottom"
              trigger="mouseenter">
              <img src={unselect} alt="" />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt="" />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="type">
          <span className="type-title">Equipment</span>
          <span className="type-action">
            <Tooltip
              title="Cancel selection"
              position="bottom"
              trigger="mouseenter">
              <img src={unselect} alt="" />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt="" />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {workouts.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" />
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

export default Manager
