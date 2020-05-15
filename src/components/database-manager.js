import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import { Tooltip } from 'react-tippy'
import unselect from '../gallery/unselect.png'
import trash from '../gallery/trash.png'

const Manager = ({ updatePopulation, resetAllBoxes, controlDBCheckbox }) => {
  const [{ data, exercises, workouts }, dispatch] = useStateValue()

  const [equipment, setEquipment] = useState('')
  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')

  const [EQSelection, setEQSelection] = useState([])
  const [MUSelection, setMUSelection] = useState([])
  const [EXSelection, setEXSelection] = useState([])
  const [ExerciseSelection, setExerciseSelection] = useState([])
  const [WorkoutSelection, setWorkoutSelection] = useState([])

  useEffect(() => {
    resetAllBoxes()
  }, [])

  const InsertIntoDatabase = (type, payload) => {
    axios
      .post(process.env.REACT_APP_POST + `/${type}data`,
        { [type]: payload })
      .then(res => {
        console.log(res)
        updatePopulation()
      })
      .catch(err => console.log(err))
  }

  const formSubmit = e => {
    e.preventDefault();
    if (!equipment && !exercise && !muscle) {
      return console.log('Enter a form value');
    }
    let isDupe = false
    if (equipment) {
      data.equipment.forEach(e => { if (e.name === equipment) isDupe = true });
      if (equipment && !isDupe) {
        InsertIntoDatabase('equipment', equipment)
        setEquipment("")
      }
    } else if (muscle) {
      data.muscles.forEach(m => { if (m.name === muscle) isDupe = true });
      if (muscle && !isDupe) {
        InsertIntoDatabase('muscle', muscle)
        setMuscle("")
      }
    } else {
      data.exercises.forEach(e => { if (e.name === exercise) isDupe = true });
      if (exercise && !isDupe) {
        InsertIntoDatabase('exercise', exercise)
        setExercise("")
      }
    }
  }

  const deleteDataFromDatabase = (path, column, row) => {
    row.forEach(async item => {
      await axios.post(process.env.REACT_APP_DELETE + path, {
        column: column, row: item
      })
        .then(res => {
          updatePopulation()
        })
        .catch(e => console.log(e))
    });
  }

  return (
    <>
      <div className="db-manager">
        <h1 className="db-title">Add Compositions <span>One at a time</span></h1>
        <div className="add-compositions">
          <form id="add-composition-form" onSubmit={e => (formSubmit(e))}>
            <Input placeholder="Add Equipment" value={equipment}
              onChange={e => { (!exercise && !muscle) && setEquipment(e.target.value) }} />
            <Input placeholder="Add Muscle" value={muscle}
              onChange={e => { (!equipment && !exercise) && setMuscle(e.target.value) }} />
            <Input placeholder="Add Exercise" value={exercise}
              onChange={e => { (!equipment && !muscle) && setExercise(e.target.value) }} />
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
              <img src={unselect} alt=""
                onClick={() => {
                  let copy = [...data.equipment]
                  copy.forEach(item => item.checked = false);
                  dispatch({ type: 'DAaction', data: { ...data, copy } })
                  setEQSelection([])
                }} />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt=""
                onClick={() => deleteDataFromDatabase('/fromdatabase', 'equipment', EQSelection)} />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {data.equipment.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked}
                    onChange={() => controlDBCheckbox(i, 'data', 'equipment', setEQSelection)} />
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
              <img src={unselect} alt=""
                onClick={() => {
                  let copy = [...data.muscles]
                  copy.forEach(item => item.checked = false);
                  dispatch({ type: 'DAaction', data: { ...data, copy } })
                  setMUSelection([])
                }} />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt=""
                onClick={() => deleteDataFromDatabase('/fromdatabase', 'muscle', MUSelection)} />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {data.muscles.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked}
                    onChange={() => controlDBCheckbox(i, 'data', 'muscles', setMUSelection)} />
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
              <img src={unselect} alt=""
                onClick={() => {
                  let copy = [...data.exercises]
                  copy.forEach(item => item.checked = false);
                  dispatch({ type: 'DAaction', data: { ...data, copy } })
                  setEXSelection([])
                }} />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt=""
                onClick={() => deleteDataFromDatabase('/fromdatabase', 'exercise', EXSelection)} />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {data.exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked}
                    onChange={() => controlDBCheckbox(i, 'data', 'exercises', setEXSelection)} />
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
              <img src={unselect} alt=""
                onClick={() => {
                  let copy = [...exercises]
                  copy.forEach(item => item.checked = false);
                  dispatch({ type: 'EXaction', exercises: copy })
                  setExerciseSelection([])
                }} />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt=""
                onClick={() => deleteDataFromDatabase('/frombuiltexercises', 'name', ExerciseSelection)} />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {exercises.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked}
                    onChange={() => controlDBCheckbox(i, 'exercises', 'exercises', setExerciseSelection)} />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="type">
          <span className="type-title">Workouts</span>
          <span className="type-action">
            <Tooltip
              title="Cancel selection"
              position="bottom"
              trigger="mouseenter">
              <img src={unselect} alt=""
                onClick={() => {
                  let copy = [...workouts]
                  copy.forEach(item => item.checked = false);
                  dispatch({ type: 'WOaction', workouts: copy })
                  setWorkoutSelection([])
                }} />
            </Tooltip>
            <Tooltip
              title="Delete Selection"
              position="bottom"
              trigger="mouseenter">
              <img src={trash} alt=""
                onClick={() => deleteDataFromDatabase('/frombuiltworkouts', 'name', WorkoutSelection)} />
            </Tooltip>
          </span>
        </div>
        <div className="type-map">
          {workouts.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked}
                    onChange={() => controlDBCheckbox(i, 'workouts', 'workouts', setWorkoutSelection)} />
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
