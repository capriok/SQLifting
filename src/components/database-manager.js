/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import SelectionButtons from './assembly/selection-buttons'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'

import useBoxControl from '../hooks/useBoxControl';
import useUpdatePopulation from '../hooks/useUpdatePopulation';
import useReset from '../hooks/useReset';

const Manager = () => {
  const [{
    user,
    compositions: {
      equipments,
      muscles,
      exercises,
      movements
    },
    composites: {
      excos,
      wocos,
      circos
    } },
    dispatch] = useStateValue()
  const updatePopulation = useUpdatePopulation()
  const { controlDBCheckbox } = useBoxControl()
  const resetAll = useReset()

  const user_id = user.details.user_id

  const [equipment, setEquipment] = useState('')
  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')

  const [EQSelection, setEQSelection] = useState([])
  const [MUSelection, setMUSelection] = useState([])
  const [EXSelection, setEXSelection] = useState([])
  const [ExerciseSelection, setExerciseSelection] = useState([])
  const [WorkoutSelection, setWorkoutSelection] = useState([])

  useEffect(() => {
    resetAll()
  }, [])

  const InsertIntoDatabase = (type, payload) => {
    axios
      .post(process.env.REACT_APP_POST + `/${type}data`,
        {
          user_id: user.details.user_id,
          [type]: payload
        })
      .then(res => {
        console.log(res)
        updatePopulation(type)
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
      equipment.forEach(e => { if (e.name === equipment) isDupe = true });
      if (equipment && !isDupe) {
        InsertIntoDatabase('equipment', equipment)
        setEquipment("")
      }
    } else if (muscle) {
      muscles.forEach(m => { if (m.name === muscle) isDupe = true });
      if (muscle && !isDupe) {
        InsertIntoDatabase('muscle', muscle)
        setMuscle("")
      }
    } else {
      exercises.forEach(e => { if (e.name === exercise) isDupe = true });
      if (exercise && !isDupe) {
        InsertIntoDatabase('exercise', exercise)
        setExercise("")
      }
    }
  }

  let deleteDataFromDatabase = (path, column, row, type) => {
    row.forEach(async item => {
      await axios.post(process.env.REACT_APP_DELETE + path, {
        user_id: user_id, column: column, row: item
      })
        .then(() => {
          updatePopulation(type)
        })
        .catch(e => console.log(e))
    });
  }
  if (user.details.user_id === 24) deleteDataFromDatabase = () => { alert('no delete on demo') }

  return (
    <>
      <div className="db-manager">
        <h1 className="db-title">Add Compositions <span>One at a time</span></h1>
        <div className="add-compositions">
          <form id="add-composition-form" onSubmit={e => (formSubmit(e))}>
            <Input placeholder="Add Equipment" value={equipment.toLowerCase()}
              onChange={e => { (!exercise && !muscle) && setEquipment(e.target.value) }} />
            <Input placeholder="Add Muscle" value={muscle.toLowerCase()}
              onChange={e => { (!equipment && !exercise) && setMuscle(e.target.value) }} />
            <Input placeholder="Add Exercise" value={exercise.toLowerCase()}
              onChange={e => { (!equipment && !muscle) && setExercise(e.target.value) }} />
          </form>
          <Button text="Submit" type="submit" form="add-composition-form" />
        </div>
        <h1 className="db-title">Compositions</h1>
        <div className="type">
          <span className="type-title">Equipment</span>
          <span className="type-action">
            <SelectionButtons
              cancelClick={() => {
                let copy = [...equipment]
                copy.forEach(item => item.checked = false);
                // dispatch({ type: 'DAaction', data: { ...data, copy } })
                setEQSelection([])
              }}
              submitClick={() => {
                deleteDataFromDatabase('/fromdatabase', 'equipment', EQSelection, 'equipment')
              }
              } />

          </span>
        </div>
        <div className="type-map">
          {equipments.map((item, i) => (
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
            <SelectionButtons
              cancelClick={() => {
                let copy = [...muscles]
                copy.forEach(item => item.checked = false);
                // dispatch({ type: 'DAaction', data: { ...data, copy } })
                setMUSelection([])
              }}
              submitClick={() => {
                deleteDataFromDatabase('/fromdatabase', 'muscle', MUSelection, 'muscle')
              }} />
          </span>
        </div>
        <div className="type-map">
          {muscles.map((item, i) => (
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
            <SelectionButtons
              cancelClick={() => {
                let copy = [...exercises]
                copy.forEach(item => item.checked = false);
                // dispatch({ type: 'DAaction', data: { ...data, copy } })
                setEXSelection([])
              }}
              submitClick={() => {
                deleteDataFromDatabase('/fromdatabase', 'exercise', EXSelection, 'exercise')
              }} />
          </span>
        </div>
        <div className="type-map">
          {exercises.map((item, i) => (
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
            <SelectionButtons
              cancelClick={() => {
                let copy = [...exercises]
                copy.forEach(item => item.checked = false);
                // dispatch({ type: 'EXaction', exercises: copy })
                setExerciseSelection([])
              }}
              submitClick={() => {
                deleteDataFromDatabase('/frombuiltexercises', 'name', ExerciseSelection, 'exercises')
              }} />
          </span>
        </div>
        <div className="type-map">
          {excos.map((item, i) => (
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
            <SelectionButtons
              cancelClick={() => {
                let copy = [...wocos]
                copy.forEach(item => item.checked = false);
                // dispatch({ type: 'WOaction', workouts: copy })
                setWorkoutSelection([])
              }}
              submitClick={() => {
                deleteDataFromDatabase('/frombuiltworkouts', 'name', WorkoutSelection, 'workouts')
              }} />
          </span>
        </div>
        <div className="type-map">
          {wocos.map((item, i) => (
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
