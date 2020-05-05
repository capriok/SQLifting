import React from 'react'
import { useStateValue } from '../../state'
import Button from 'godspeed/build/Button'
import QuantitySetter from '../quantitysetter'
import axios from 'axios'

const WorkoutViewer = ({ build, setBuild }) => {
  const [{ workouts }, dispatch] = useStateValue()

  const submitBuild = (e) => {
    e.preventDefault()
    if (build.name) {
      axios
        .post(`${process.env.REACT_APP_POST_URL}/builtworkouts`, {
          name: build.name,
          workout: build.workout
        })
        .then(res => console.log('Post Success!'))
        .catch(e => console.log(e))
      dispatch({
        type: 'WOaction',
        workouts: [
          ...workouts,
          { ...build }
        ]
      })
      setBuild({
        name: undefined,
        workout: []
      })
    } else alert('Name this workout.')
  }

  const increment = (i, type) => {
    const copy = { ...build.workout }
    copy[i][type] = copy[i][type] + 1
    setBuild({ ...build })
  }

  const decrement = (i, type) => {
    if (build.workout[i][type] === 1) return
    const copy = { ...build.workout }
    copy[i][type] = copy[i][type] - 1
    setBuild({ ...build })
  }

  return (
    <>
      <div className="build">
        <h1 className="workout-name">{build.name}</h1>
        {build.workout.map((build, i) => (
          <div className="workout-build" key={i}>
            <p className="name">{build.name}</p>
            <div className="setters">
              <div className="reps">
                <span>Reps</span>
                <QuantitySetter
                  count={build.reps}
                  incrementer={() => increment(i, 'reps')}
                  decrementer={() => decrement(i, 'reps')}
                />
              </div>
              <div className="sets">
                <span>Sets</span>
                <QuantitySetter
                  count={build.sets}
                  incrementer={() => increment(i, 'sets')}
                  decrementer={() => decrement(i, 'sets')}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={e => submitBuild(e)}>
        <Button text="Submit"></Button>
      </form>
    </>
  )
}

export default WorkoutViewer