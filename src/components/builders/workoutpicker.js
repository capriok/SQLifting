import React, { useState } from 'react'
import { useStateValue } from '../../state'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import Viewer from '../viewers/workoutstarter'

const Workouts = ({ workout, setWorkout }) => {
  const [{ workouts },] = useStateValue()

  const sendOver = (payload) => {
    console.log(payload);
    setWorkout(payload)
  }

  return (
    <>
      <div className="left">
        <Accordion className="accordian" allowZeroExpanded >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Choose Workout
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="listing">
                {workouts.map((workout, i) => (
                  <div className="list-item" key={i}>
                    <p className="item">{workout.name}</p>
                    <span className="x" onClick={e => sendOver(workout)}>-></span>
                  </div>
                ))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="right">
        <Viewer workout={workout} />
      </div>
    </>
  )
}

export default Workouts