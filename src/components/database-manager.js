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
import TypeSection from './assembly/type-section'

const Manager = () => {
  const [{
    user,
    compositions,
    composites,
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
  const [circuit, setCircuit] = useState('')

  const [EQSelection, setEQSelection] = useState([])
  const [MUSelection, setMUSelection] = useState([])
  const [EXSelection, setEXSelection] = useState([])
  const [MOSelection, setMOSelection] = useState([])
  const [ExcoSelection, setExcoSelection] = useState([])
  const [WocoSelection, setWocoSelection] = useState([])
  const [CircoSelection, setCircoSelection] = useState([])

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

  const createMap = (arr, type, prop, setter) => (
    <div className="type-map">
      {arr.length > 0 ? arr.map((item, i) => (
        <div className="item" key={i}>
          <div className="shift">
            <label className="label">
              <Input className="input" type="checkbox" checked={item.checked}
                onChange={() => controlDBCheckbox(i, type, prop, setter)} />
              <div className="item-name">{item.name}</div>
            </label>
          </div>
        </div>
      ))
        :
        <p className="item"><p className="shift" style={{ marginLeft: 45 }}>No Results</p></p>}
    </div>
  )

  const unSelect = (parent, child, type, setter) => {
    let copy = [...child]
    copy.forEach(item => item.checked = false);
    dispatch({ type: type, [parent]: { ...parent, [child]: copy } })
    setter([])
  }

  const deleteDataFromDatabase = (path, column, row, type) => {
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
        {/* ---------------------- Equipment section ----------------------*/}
        <TypeSection title="Equipment">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, equipments, 'COMPOPSITION_ACTION', setEQSelection)}
            submitClick={() => deleteDataFromDatabase('/fromdatabase', 'equipment', EQSelection, 'equipment')} />
        </TypeSection>
        {createMap(equipments, 'COMPOSITION_ACTION', 'equipments', setEQSelection)}
        {/* ---------------------- Muscles section ----------------------*/}
        <TypeSection title="Muscles">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, muscles, 'COMPOPSITION_ACTION', setMUSelection)}
            submitClick={() => deleteDataFromDatabase('/fromdatabase', 'muscle', MUSelection, 'muscle')} />
        </TypeSection>
        {createMap(muscles, 'COMPOSITION_ACTION', 'muscles', setMUSelection)}
        {/* ---------------------- Exercises Section ----------------------*/}
        <TypeSection title="Exercises">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, exercises, 'COMPOPSITION_ACTION', setEXSelection)}
            submitClick={() => deleteDataFromDatabase('/fromdatabase', 'exercise', EXSelection, 'exercise')} />
        </TypeSection>
        {createMap(exercises, 'COMPOSITION_ACTION', 'exercises', setEXSelection)}
        {/* ---------------------- Movements Section ----------------------*/}
        <TypeSection title="Movements">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, movements, 'COMPOPSITION_ACTION', setMOSelection)}
            submitClick={() => deleteDataFromDatabase('/fromdatabase', 'movement', MOSelection, 'movement')} />
        </TypeSection>
        {createMap(movements, 'COMPOSITION_ACTION', 'movements', setMOSelection)}
        {/* ---------------------- Circuits Section ----------------------*/}
        <h1 className="db-title">Composites</h1>
        <TypeSection title="Circuits">
          <SelectionButtons
            cancelClick={() => unSelect(composites, circos, 'COMPOPSITE_ACTION', setCircoSelection)}
            submitClick={() => deleteDataFromDatabase('/frombuiltworkouts', 'name', CircoSelection, 'circuits')} />
        </TypeSection>
        {createMap(circos, 'COMPOSITE_ACTION', 'circos', setCircoSelection)}
        {/* ---------------------- Exercises Section ----------------------*/}
        <TypeSection title="Exercises">
          <SelectionButtons
            cancelClick={() => unSelect(composites, excos, 'COMPOPSITE_ACTION', setWocoSelection)}
            submitClick={() => deleteDataFromDatabase('/frombuiltexercises', 'name', ExcoSelection, 'exercises')} />
        </TypeSection>
        {createMap(excos, 'COMPOSITE_ACTION', 'excos', setExcoSelection)}
        {/* ---------------------- Workouts Section ----------------------*/}
        <TypeSection title="Workouts">
          <SelectionButtons
            cancelClick={() => unSelect(composites, wocos, 'COMPOPSITE_ACTION', setWocoSelection)}
            submitClick={() => deleteDataFromDatabase('/frombuiltworkouts', 'name', WocoSelection, 'workouts')} />
        </TypeSection>
        {createMap(wocos, 'COMPOSITE_ACTION', 'wocos', setWocoSelection)}
      </div>
    </>
  )
}


export default Manager
