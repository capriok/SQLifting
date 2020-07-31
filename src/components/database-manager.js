/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import { Button, Input } from 'godspeed'

import SelectionButtons from './assembly/selection-buttons'
import TypeHead from './assembly/type-head'

import useUpdatePopulation from '../hooks/useUpdatePopulation';
import useBoxControl from '../hooks/useBoxControl'
import useReset from '../hooks/useReset';

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

  const formSubmit = e => {
    e.preventDefault();
    if (!equipment && !exercise && !muscle) {
      return console.log('Enter a form value');
    }
    let isDupe = false
    if (equipment) {
      equipments.forEach(e => { if (e.name === equipment) isDupe = true });
      if (equipment && !isDupe) {
        insertRecord('equipment', null, equipment)
        setEquipment("")
      }
    } else if (muscle) {
      muscles.forEach(m => { if (m.name === muscle) isDupe = true });
      if (muscle && !isDupe) {
        insertRecord('muscle', null, muscle)
        setMuscle("")
      }
    } else {
      exercises.forEach(e => { if (e.name === exercise) isDupe = true });
      if (exercise && !isDupe) {
        insertRecord('exercise', null, exercise)
        setExercise("")
      }
    }
  }

  const unSelect = (parent, child, type, setter) => {
    let copy = [...child]
    copy.forEach(item => item.checked = false);
    dispatch({ type: type, [parent]: { ...parent, [child]: copy } })
    setter([])
  }

  const insertRecord = (table, type, payload) => {
    axios
      .post(process.env.REACT_APP_POST + `/composition`,
        {
          table: table,
          name: payload,
          uid: user.details.uid
        })
      .then(res => {
        console.log(res)
        updatePopulation()
      })
      .catch(err => console.log(err))
  }

  const deleteRecord = (selection, table) => {
    selection.forEach(async record => {
      console.log(record);
      await axios.post(process.env.REACT_APP_DELETE + '/byid', {
        table: table,
        id: record
      })
        .then(() => {
          updatePopulation()
        })
        .catch(e => console.log(e))
    });
  }

  const createMap = (arr, type, prop, setter) => (
    <div className="type-map">
      {arr.length > 0
        ? arr.map((item, i) => (
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
        : <div className="item">
          <p className="shift no-res">No Results</p>
        </div>
      }
    </div>
  )

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
        <TypeHead title="Equipment">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, equipments, 'COMPOPSITION_ACTION', setEQSelection)}
            submitClick={() => deleteRecord(EQSelection, 'equipment')} />
        </TypeHead>
        {createMap(equipments, 'COMPOSITION_ACTION', 'equipments', setEQSelection)}
        {/* ---------------------- Muscles section ----------------------*/}
        <TypeHead title="Muscles">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, muscles, 'COMPOPSITION_ACTION', setMUSelection)}
            submitClick={() => deleteRecord(MUSelection, 'muscle')} />
        </TypeHead>
        {createMap(muscles, 'COMPOSITION_ACTION', 'muscles', setMUSelection)}
        {/* ---------------------- Exercises Section ----------------------*/}
        <TypeHead title="Exercises">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, exercises, 'COMPOPSITION_ACTION', setEXSelection)}
            submitClick={() => deleteRecord(EXSelection, 'exercise')} />
        </TypeHead>
        {createMap(exercises, 'COMPOSITION_ACTION', 'exercises', setEXSelection)}
        {/* ---------------------- Movements Section ----------------------*/}
        <TypeHead title="Movements">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, movements, 'COMPOPSITION_ACTION', setMOSelection)}
            submitClick={() => deleteRecord(MOSelection, 'movements')} />
        </TypeHead>
        {createMap(movements, 'COMPOSITION_ACTION', 'movements', setMOSelection)}
        <h1 className="db-title">Composites</h1>
        {/* ---------------------- Circuits Section ----------------------*/}
        <TypeHead title="Circuits">
          <SelectionButtons
            cancelClick={() => unSelect(composites, circos, 'COMPOPSITE_ACTION', setCircoSelection)}
            submitClick={() => deleteRecord(CircoSelection, 'circuits')} />
        </TypeHead>
        {createMap(circos, 'COMPOSITION_ACTION', 'circos', setCircoSelection)}
        {/* ---------------------- Exercises Section ----------------------*/}
        <TypeHead title="Exercises">
          <SelectionButtons
            cancelClick={() => unSelect(composites, excos, 'COMPOPSITE_ACTION', setWocoSelection)}
            submitClick={() => deleteRecord(ExcoSelection)} />
        </TypeHead>
        {createMap(excos, 'COMPOSITION_ACTION', 'excos', setExcoSelection)}
        {/* ---------------------- Workouts Section ----------------------*/}
        <TypeHead title="Workouts">
          <SelectionButtons
            cancelClick={() => unSelect(composites, wocos, 'COMPOPSITE_ACTION', setWocoSelection)}
            submitClick={() => deleteRecord(WocoSelection)} />
        </TypeHead>
        {createMap(wocos, 'COMPOSITION_ACTION', 'wocos', setWocoSelection)}
      </div>
    </>
  )
}


export default Manager
