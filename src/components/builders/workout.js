import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import Viewer from '../WorkoutViewer'

const Builder = ({ build, setBuild }) => {
  const [{ exercises, workouts }, dispatch] = useStateValue()

  const sendOver = (name, payload) => {
    let isDupe = false
    build.forEach(item => {
      if (item.exercise === payload) isDupe = true
    });
    !isDupe && setBuild([
      ...build,
      {
        id: workouts.length + 1,
        [name]: payload,
        reps: 1,
        sets: 1
      }
    ])
  }

  useEffect(() => { console.log(workouts); }, [workouts])

  return (
    <>
      <div className="left">
        <Accordion className="accordian" allowZeroExpanded >
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

export default Builder
