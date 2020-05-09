import React, { useState } from 'react'
import { useStateValue } from '../../state'
import axios from 'axios'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import Viewer from '../viewers/databaseviewer'

const DatabaseBuilder = ({ updatePopulation }) => {
  const [{ data }, dispatch] = useStateValue()

  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')
  const [equipment, setEquipment] = useState('')

  const InsertIntoDatabase = (type, payload) => {
    axios
      .post(`${process.env.REACT_APP_POST}/${type}data`,
        { [type]: payload })
      .then(res => {
        console.log(res)
        updatePopulation()
      })
  }

  return (
    <>
      <div className="left">
        <div className="database-entry">
          <form className="form" onSubmit={(e) => {
            e.preventDefault();
            let isDupe = false
            data.equipment.forEach(e => { if (e.name === equipment) isDupe = true });
            if (equipment && !isDupe) {
              InsertIntoDatabase('equipment', equipment)
              setEquipment("")
            }
          }}>
            <Input placeholder="Add Equipment"
              onChange={e => { setEquipment(e.target.value) }} value={equipment} />
            <Button text="Add Equipment" size="xsm" />
          </form>
          <form className="form" onSubmit={(e) => {
            e.preventDefault()
            let isDupe = false
            data.muscles.forEach(m => { if (m.name === muscle) isDupe = true });
            if (muscle && !isDupe) {
              InsertIntoDatabase('muscle', muscle)
              setMuscle("")
            }
          }}>
            <Input placeholder="Add Muscle"
              onChange={e => { setMuscle(e.target.value) }} value={muscle} />
            <Button text="Add Muscle" size="xsm" />
          </form>
          <form className="form" onSubmit={(e) => {
            e.preventDefault();
            let isDupe = false
            data.exercises.forEach(e => { if (e.name === exercise) isDupe = true });
            if (exercise && !isDupe) {
              InsertIntoDatabase('exercise', exercise)
              setExercise("")
            }
          }}>
            <Input placeholder="Add Exercise"
              onChange={e => { setExercise(e.target.value) }} value={exercise} />
            <Button text="Add Exercise" size="xsm" />
          </form>
        </div>
      </div>
      <div className="right">
        <Viewer data={data} />
      </div>
    </>
  )
}

export default DatabaseBuilder
