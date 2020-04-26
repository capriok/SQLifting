import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import arrow from '../gallery/arrow.png'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './accordian.scss'

const Accordian = () => {
  const [{ data }, dispatch] = useStateValue()

  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')
  const [equipment, setEquipment] = useState('')
  const [reps, setReps] = useState(1)
  const [sets, setSets] = useState(1)



  return (
    <Accordion className="accordian" allowZeroExpanded >
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Muscle
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="listing">
            {data.muscles.map((item, i) => (
              <div className="list-item" key={i}>
                <span className="item" >{item.name}</span>
                <span className="x" onClick={() => {
                  dispatch({ type: 'DBaction', data: { ...data, muscles: data.muscles.filter(m => m.id !== item.id) } })
                }}>x</span>
              </div>))}
          </div>
          <form onSubmit={(e) => {
            e.preventDefault()
            muscle && dispatch({
              type: 'DBaction', data: {
                ...data,
                muscles: [...data.muscles, {
                  id: data.muscles.length + 1,
                  name: muscle
                }]
              }
            })
            setMuscle("")
          }} className="form">
            <Input placeholder="Muscle"
              onChange={e => { setMuscle(e.target.value) }} value={muscle} />
            <Button text="Add Muscle" size="xsm" />
          </form>
        </AccordionItemPanel>
      </AccordionItem>
      {/*/////////////////////////////////////////////////////*/}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Exercise
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="listing">
            {data.exercises.map((item, i) => (
              <div className="list-item" key={i}>
                <span className="item">{item.name}</span>
                <span className="x" onClick={() => {
                  dispatch({ type: 'DBaction', data: { ...data, exercises: data.exercises.filter(e => e.id !== item.id) } })
                }}>x</span>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => {
            e.preventDefault()
            exercise && dispatch({
              type: 'DBaction', data: {
                ...data, exercises: [...data.exercises, {
                  id: data.exercises.length + 1,
                  name: exercise
                }]
              }
            })
            setExercise("")
          }} className="form">
            <Input placeholder="Add Exercise"
              onChange={e => { setExercise(e.target.value) }} value={exercise} />
            <Button text="Add Exercise" size="xsm" />
          </form>
        </AccordionItemPanel>
      </AccordionItem>
      {/*/////////////////////////////////////////////////////*/}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Equipment
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="listing">
            {data.equipment.map((item, i) => (
              <div className="list-item" key={i}>
                <span className="item">{item.name}</span>
                <span className="x" onClick={() => {
                  dispatch({ type: 'DBaction', data: { ...data, equipment: data.equipment.filter(e => e.id !== item.id) } })
                }}>x</span>
              </div>))}
          </div>
          <form onSubmit={(e) => {
            e.preventDefault()
            equipment && dispatch({
              type: 'DBaction', data: {
                ...data, equipment: [...data.equipment, {
                  id: data.equipment.length + 1,
                  name: equipment
                }]
              }
            })
            setEquipment("")
          }} className="form">
            <Input placeholder="Add Equipment"
              onChange={e => { setEquipment(e.target.value) }} value={equipment} />
            <Button text="Add Equipment" size="xsm" />
          </form>
        </AccordionItemPanel>
      </AccordionItem>
      {/*/////////////////////////////////////////////////////*/}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Reps
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="numberSetter">
            <div className="dec" onClick={() => reps > 1 && setReps(() => reps - 1)}><img src={arrow} alt="" /></div>
            <div className="field">{reps}</div>
            <div className="inc" onClick={() => setReps(() => reps + 1)}><img src={arrow} alt="" /></div>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
      {/*/////////////////////////////////////////////////////*/}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Sets
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="numberSetter">
            <div className="dec" onClick={() => sets > 1 && setSets(() => sets - 1)}><img src={arrow} alt="" /></div>
            <div className="field">{sets}</div>
            <div className="inc" onClick={() => setSets(() => sets + 1)}><img src={arrow} alt="" /></div>
          </div>        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default Accordian
