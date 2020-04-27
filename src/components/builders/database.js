import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';

const Database = () => {
  const [{ data }, dispatch] = useStateValue()

  const [muscle, setMuscle] = useState('')
  const [exercise, setExercise] = useState('')
  const [equipment, setEquipment] = useState('')

  return (
    <>
      <div className="left">
        <div className="database-entry">
          <form className="form" onSubmit={(e) => {
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
          }}>
            <Input placeholder="Add Muscle"
              onChange={e => { setMuscle(e.target.value) }} value={muscle} />
            <Button text="Add Muscle" size="xsm" />
          </form>
          <form className="form" onSubmit={(e) => {
            e.preventDefault();
            exercise && dispatch({
              type: 'DBaction', data: {
                ...data, exercises: [...data.exercises, {
                  id: data.exercises.length + 1,
                  name: exercise
                }]
              }
            })
            setExercise("")
          }}>
            <Input placeholder="Add Exercise"
              onChange={e => { setExercise(e.target.value) }} value={exercise} />
            <Button text="Add Exercise" size="xsm" />
          </form>
          <form className="form" onSubmit={(e) => {
            e.preventDefault();
            equipment && dispatch({
              type: 'DBaction', data: {
                ...data, equipment: [...data.equipment, {
                  id: data.equipment.length + 1,
                  name: equipment
                }]
              }
            })
            setEquipment("")
          }}>
            <Input placeholder="Add Equipment"
              onChange={e => { setEquipment(e.target.value) }} value={equipment} />
            <Button text="Add Equipment" size="xsm" />
          </form>
        </div>
      </div>
      <div className="right">
        <Accordion className="accordian" allowZeroExpanded >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Muscles
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
            </AccordionItemPanel>
          </AccordionItem>
          {/*/////////////////////////////////////////////////////*/}

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Exercises
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
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default Database
