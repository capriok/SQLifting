import React, { useState } from 'react'
import { useStateValue } from '../../state'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import Viewer from '../viewers/workoutviewer'
import Input from 'godspeed/build/Input/Input';
import Button from 'godspeed/build/Button'

const WorkoutBuilder = ({ build, setBuild }) => {
  const [{ exercises, workouts },] = useStateValue()
  const [name, setName] = useState('')

  const sendOver = (name, payload) => {
    let isDupe = false
    build.workout.forEach(item => {
      if (item.exercise === payload) isDupe = true
    });
    if (!isDupe && name) {
      setBuild({
        ...build,
        workout: [
          ...build.workout,
          {
            id: workouts.length + 1,
            [name]: payload,
            reps: 1,
            sets: 1
          }
        ]
      })
    }
  }

  return (
    <>
      <div className="left">
        <Accordion className="accordian" allowZeroExpanded >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Name This Workout
            </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <form onSubmit={(e) => {
                e.preventDefault()
                name && setBuild({
                  ...build, name
                })
                setName("")
              }} className="form">
                <Input placeholder="Workout Name"
                  onChange={e => { setName(e.target.value) }} value={name} />
                <Button text="Confirm" size="xsm" />
              </form>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Add Exercises to workout
            </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="listing">
                {exercises.map((item, i) => (
                  <div className="list-item" key={i}>
                    <span className="item">{item.name}</span>
                    <span className="x" title="exercise"
                      onClick={e => sendOver(e.target.title, item.name)
                      }>-></span>
                  </div>))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="right">
        <Viewer build={build} setBuild={setBuild} />
      </div>
    </>
  )
}

export default WorkoutBuilder
