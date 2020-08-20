/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import { Button, Input } from 'godspeed'

import SelectionButtons from './assembly/selection-buttons'
import TypeHead from './assembly/type-head'

import useUpdate from '../hooks/useUpdate.js';
import useBoxControl from '../hooks/useBoxControl'
import useReset from '../hooks/useReset';
import { SQLifting } from '../api/sqlifting'

const Manager = () => {
  const [{
    user: { details: { uid } },
    compositions,
    composites,
    compositions: { equipments, muscles, exercises, movements },
    composites: { circs, excos, wocos }
  }, dispatch] = useStateValue()

  const update = useUpdate()
  const { controlDBCheckbox } = useBoxControl()
  const resetAll = useReset()

  const [equipment, setEquipment] = useState('')
  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')
  const [circuit, setCircuit] = useState('')

  const [EQSelection, setEQSelection] = useState([])
  const [MUSelection, setMUSelection] = useState([])
  const [EXSelection, setEXSelection] = useState([])
  const [MOSelection, setMOSelection] = useState([])
  const [CircSelection, setCircSelection] = useState([])
  const [ExcoSelection, setExcoSelection] = useState([])
  const [WocoSelection, setWocoSelection] = useState([])

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
        insertRecord('equipment', equipment)
        setEquipment("")
      }
    } else if (muscle) {
      muscles.forEach(m => { if (m.name === muscle) isDupe = true });
      if (muscle && !isDupe) {
        insertRecord('muscle', muscle)
        setMuscle("")
      }
    } else {
      exercises.forEach(e => { if (e.name === exercise) isDupe = true });
      if (exercise && !isDupe) {
        insertRecord('exercise', exercise)
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

  const insertRecord = (table, payload) => {
    SQLifting.post(`/post/composition`,
      {
        table: table,
        name: payload,
        uid: uid
      })
      .then(() => {
        console.log('Post Success!')
        update('compositions', [table + 's'])
      })
      .catch(err => console.log(err))
  }

  const deleteRecord = (selection, table, type) => {
    selection.forEach(async record => {
      SQLifting.post('/delete/byid', { table: table, id: record })
        .then(() => {
          console.log('Delete Success!')
          if (table === 'circ') {
            return deleteDependencies('circ_movs', record, type, ['circs'])
          }
          if (table === 'woco') {
            return deleteDependencies('woco_excos', record, type, ['wocos'])
          }
          update(type, [table + 's'])
        })
        .catch(e => console.log(e))
    });
  }

  const deleteDependencies = (table, id, type, requests) => {
    SQLifting.post(`/delete/deps`, { table, id })
      .then(res => update(type, requests))
      .catch(err => console.log(err))
  }

  const createMap = (arr, type, prop, setter) => (
    <div className="type-map">
      {arr.length > 0
        ? arr.map((item, i) => (
          <div className="item" key={i}>
            <div className="shift">
              <label className="label">
                <Input className="input" type="checkbox" checked={item.checked}
                  onChange={() => { controlDBCheckbox(i, type, prop, setter); console.log(item) }} />
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
        <h1 className="db-title"></h1>
        {/* ---------------------- Equipment section ----------------------*/}
        <TypeHead title="Equipment">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, equipments, 'COMPOPSITION_ACTION', setEQSelection)}
            submitClick={() => deleteRecord(EQSelection, 'equipment', 'compositions')} />
        </TypeHead>
        {createMap(equipments, 'COMPOSITION_ACTION', 'equipments', setEQSelection)}
        {/* ---------------------- Muscles section ----------------------*/}
        <TypeHead title="Muscles">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, muscles, 'COMPOPSITION_ACTION', setMUSelection)}
            submitClick={() => deleteRecord(MUSelection, 'muscle', 'compositions')} />
        </TypeHead>
        {createMap(muscles, 'COMPOSITION_ACTION', 'muscles', setMUSelection)}
        {/* ---------------------- Exercises Section ----------------------*/}
        <TypeHead title="Exercises">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, exercises, 'COMPOPSITION_ACTION', setEXSelection)}
            submitClick={() => deleteRecord(EXSelection, 'exercise', 'compositions')} />
        </TypeHead>
        {createMap(exercises, 'COMPOSITION_ACTION', 'exercises', setEXSelection)}
        {/* ---------------------- Movements Section ----------------------*/}
        <TypeHead title="Movements">
          <SelectionButtons
            cancelClick={() => unSelect(compositions, movements, 'COMPOPSITION_ACTION', setMOSelection)}
            submitClick={() => deleteRecord(MOSelection, 'movement', 'compositions')} />
        </TypeHead>
        {createMap(movements, 'COMPOSITION_ACTION', 'movements', setMOSelection)}
        <h1 className="db-title">Composites</h1>
        {/* ---------------------- Circuits Section ----------------------*/}
        <TypeHead title="Circuits">
          <SelectionButtons
            cancelClick={() => unSelect(composites, circs, 'COMPOPSITE_ACTION', setCircSelection)}
            submitClick={() => deleteRecord(CircSelection, 'circ', 'composites')} />
        </TypeHead>
        {createMap(circs, 'COMPOSITE_ACTION', 'circs', setCircSelection)}
        {/* ---------------------- Exercises Section ----------------------*/}
        <TypeHead title="Exercises">
          <SelectionButtons
            cancelClick={() => unSelect(composites, excos, 'COMPOPSITE_ACTION', setWocoSelection)}
            submitClick={() => deleteRecord(ExcoSelection, 'exco', 'composites')} />
        </TypeHead>
        {createMap(excos, 'COMPOSITE_ACTION', 'excos', setExcoSelection)}
        {/* ---------------------- Workouts Section ----------------------*/}
        <TypeHead title="Workouts">
          <SelectionButtons
            cancelClick={() => unSelect(composites, wocos, 'COMPOPSITE_ACTION', setWocoSelection)}
            submitClick={() => deleteRecord(WocoSelection, 'woco', 'composites')} />
        </TypeHead>
        {createMap(wocos, 'COMPOSITE_ACTION', 'wocos', setWocoSelection)}
      </div>
    </>
  )
}


export default Manager
