import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import arrow from '../gallery/arrow.png'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './accordian.scss'

const Accordian = () => {
  const [{ workouts }, dispatch] = useStateValue()
  return (
    <Accordion className="accordian" allowZeroExpanded >
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Workouts
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="listing">
            {workouts.map((item, i) => (
              <div className="list-item" key={i}>
                <span className="item" >{item.name}</span>
                <span className="x" onClick={() => {
                  dispatch({
                    type: 'WOaction',
                    workouts: workouts.filter(w => w.id !== item.id)
                  })
                }}>x</span>
              </div>))}
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default Accordian
