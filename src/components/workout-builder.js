/*eslint no-unused-vars: "off"*/
/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import { Input } from 'godspeed'
import CountSetter from './count-setter'
import { Tooltip } from 'react-tippy'
import submit from '../gallery/submit.png'
import reset from '../gallery/reset.png'

import useBoxControl from '../hooks/useBoxControl';
// import useUpdate from '../hooks/useUpdate';
import useReset from '../hooks/useReset';

const WorkoutBuilder = () => {
  const [{
    user: { details: { uid } },
    composites: { excos }
  },] = useStateValue()

  const [build, setBuild] = useState({
    id: undefined,
    name: undefined,
    woco_excos: []
  })

  // const update = useUpdate()
  const { controlWOCheckbox } = useBoxControl(build, setBuild)
  const resetAll = useReset()
  const inputRef = useRef('')

  useEffect(() => {
    resetAll()
    setBuild({
      id: undefined,
      name: undefined,
      woco_excos: []
    })
  }, [])

  const increment = (i, type) => {
    let count
    type === 'weight' ? count = 5 : count = 1
    const copy = { ...build.woco_excos }
    copy[i][type] = copy[i][type] + count
    setBuild({ ...build })
  }

  const decrement = (i, type) => {
    let count
    type === 'weight' ? count = 5 : count = 1
    if (build.woco_excos[i][type] === 1) return
    if (type === 'weight' && build.woco_excos[i][type] === 5) return
    const copy = { ...build.woco_excos }
    copy[i][type] = copy[i][type] - count
    setBuild({ ...build })
  }

  const resetBuild = () => {
    resetAll()
    setBuild({
      id: undefined,
      name: undefined,
      woco_excos: []
    })
  }

  const submitBuild = (e) => {
    e.preventDefault()
    if (build.name && build.woco_excos.length > 0) {
      axios
        .post(process.env.REACT_APP_POST + '/woco', {
          uid: uid,
          id: build.id,
          name: build.name,
          woco_excos: build.woco_excos
        })
        .then(() => {
          console.log('Post Success!')
          // updatePopulation('composites', ['wocos'])
          setBuild({
            id: undefined,
            name: undefined,
            woco_excos: []
          })
          resetAll()
          inputRef.current = ''
        })
        .catch(e => console.log(e))
    } else alert('Somethings missing.')
  }

  useEffect(() => { (build.name && build.woco_excos.length > 0) && console.log('Workout Build', build) }, [build])

  return (
    <>
      <div className="workout-builder">
        <div className="wo-title">Workout Viewer</div>
        <div className="viewer">
          {build.name
            ? <h1 className="view-title">{build.name}</h1>
            : <div className="name-placeholder"></div>
          }
          {
            build.woco_excos.length > 0
              ? build.woco_excos.map((build, i) => (
                <div className="view-item" key={i}>
                  <div className="item-title">{build.name}</div>
                  <div className="item-setter">
                    <div className="sets">
                      <span>Sets</span>
                      <CountSetter
                        count={build.sets}
                        incrementer={() => increment(i, 'sets')}
                        decrementer={() => decrement(i, 'sets')}
                      />
                    </div>
                    <div className="reps">
                      <span>Reps</span>
                      <CountSetter
                        count={build.reps}
                        incrementer={() => increment(i, 'reps')}
                        decrementer={() => decrement(i, 'reps')}
                      />
                    </div>
                    <div className="weight">
                      <span>Weight</span>
                      <CountSetter
                        count={build.weight}
                        incrementer={() => increment(i, 'weight')}
                        decrementer={() => decrement(i, 'weight')}
                      />
                    </div>
                  </div>
                </div>
              ))
              : <div className="view-item-placeholder">
                <div className="item-title-placeholder"></div>
                <div className="item-setter-placeholder">
                  <div className="reps-placeholder">
                    <span></span>
                  </div>
                  <div className="sets-placeholder">
                    <span></span>
                  </div>
                  <div className="sets-placeholder">
                    <span></span>
                  </div>
                </div>
              </div>
          }
          <div className="viewer-actions">
            <Tooltip
              title="Reset build"
              position="bottom"
              trigger="mouseenter">
              <img src={reset} alt="" className="viewer-action-img" onClick={() => resetBuild()} />
            </Tooltip>
            <Tooltip
              title="Submit build"
              position="bottom"
              trigger="mouseenter">
              <img src={submit} alt="" className="viewer-action-img" onClick={(e) => submitBuild(e)} />
            </Tooltip>
          </div>
        </div>
        <div className="wo-title">Build Workout</div>
        <div className="wo-namer">
          <h1 className="type-title">Name this workout</h1>
          <div>
            <Input placeholder="Enter name" value={inputRef.current}
              onChange={e => {
                inputRef.current = e.target.value
                setBuild({ ...build, name: inputRef.current })
              }} />
          </div>
        </div>
        <div className="type-title">Exercises</div>
        <div className="type-map">
          {excos.map((item, i) => (
            <div className="item" key={i}>
              <div className="shift">
                <label className="label">
                  <Input className="input" type="checkbox" checked={item.checked} value={inputRef}
                    onChange={() => controlWOCheckbox(i, item.name)} />
                  <div className="item-name">{item.name}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default WorkoutBuilder
