import React from 'react'
import { useStateValue } from '../../state'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import axios from 'axios';

const DatabaseViewer = ({ data }) => {
  const [, dispatch] = useStateValue()

  const deleteDataFromDatabase = (column, row) => {
    axios.post(process.env.REACT_APP_DELETE + '/fromdatabase', {
      column: column,
      row: row
    })
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  return (
    <Accordion className="accordian" allowZeroExpanded>
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
                  deleteDataFromDatabase('equipment', item.name)
                }}>x</span>
              </div>))}
          </div>
        </AccordionItemPanel>
      </AccordionItem>
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
                  deleteDataFromDatabase('muscle', item.name)
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
                  deleteDataFromDatabase('exercise', item.name)
                }}>x</span>
              </div>
            ))}
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default DatabaseViewer
