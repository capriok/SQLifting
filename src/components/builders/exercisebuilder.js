import React, { useState } from 'react'
import { useStateValue } from '../../state'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import Viewer from '../viewers/exerciseviewer'

const ExerciseBuilder = ({ build, setBuild }) => {
  const [{ data, exercises },] = useStateValue()
  const [name, setName] = useState('')

  const sendOver = (name, payload) => {
    setBuild({
      ...build,
      id: exercises.length + 1,
      [name]: payload
    })
  }

  return (
    <>
      <div className="left">
        <Accordion className="accordian" allowZeroExpanded >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Name This Exercise
            </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <form onSubmit={(e) => {
                e.preventDefault()
                setBuild({ ...build, name })
                setName("")
              }} className="form">
                <Input placeholder="Exercise Name"
                  onChange={e => { setName(e.target.value) }} value={name} />
                <Button text="Confirm" size="xsm" />
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
                    <span className="x" onClick={e => sendOver(e.target.title, item.name)} title="equipment">-></span>
                  </div>
                ))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
          {/*/////////////////////////////////////////////////////*/}
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
                    <span className="item">{item.name}</span>
                    <span className="x" onClick={e => sendOver(e.target.title, item.name)} title="muscle">-></span>
                  </div>))}
              </div>
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
                    <span className="x" onClick={e => sendOver(e.target.title, item.name)} title="exercise">-></span>
                  </div>
                ))}
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

export default ExerciseBuilder
