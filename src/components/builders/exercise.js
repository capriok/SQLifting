import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import Button from 'godspeed/build/Button'
import Input from 'godspeed/build/Input'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import Viewer from '../ExerciseViewer'

const Builder = ({ build, setBuild }) => {
  const [{ data, workouts }, dispatch] = useStateValue()
  const [name, setName] = useState('')

  const sendOver = (name, payload) => {
    setBuild({
      ...build,
      category: 'exercises',
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
                setBuild({ ...build, category: 'exercises', name })
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
                    <span className="item" onClick={() => sendOver(item.name)}>{item.name}</span>
                    <span className="x" onClick={e => sendOver(e.target.title, item.name)} title="equipment">-></span>
                  </div>))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
          {/*/////////////////////////////////////////////////////*/}
          {/* <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Reps
          </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="listing">
                {data.reps.map((item, i) => (
                  <div className="list-item" key={i}>
                    <span className="item" onClick={() => sendOver(item.count)}>{item.count}</span>
                    <span className="x" onClick={e => sendOver(e.target.title, item.count)} title="reps">-></span>
                  </div>))}
              </div>
            </AccordionItemPanel>
          </AccordionItem> */}
          {/*/////////////////////////////////////////////////////*/}
          {/* <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Sets
          </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="listing">
                {data.sets.map((item, i) => (
                  <div className="list-item" key={i}>
                    <span className="item" onClick={() => sendOver(item.count)}>{item.count}</span>
                    <span className="x" onClick={e => sendOver(e.target.title, item.count)} title="sets">-></span>
                  </div>))}
              </div>
            </AccordionItemPanel>
          </AccordionItem> */}
        </Accordion>
      </div>
      <div className="right">
        <Viewer build={build} setBuild={setBuild} />
      </div>
    </>
  )
}

export default Builder
