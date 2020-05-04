import React from 'react'
import axios from 'axios'
import { useStateValue } from '../../state'
import Button from 'godspeed/build/Button'

const ExerciseViewer = ({ build, setBuild }) => {
  const [{ exercises }, dispatch] = useStateValue()

  const submitBuild = (e) => {
    e.preventDefault()
    const buildValues = Object.values(build)
    let hasUndefined = false
    console.log(build);

    buildValues.forEach((v) => {
      if (v === undefined) hasUndefined = true
    })
    if (!hasUndefined) {
      axios
        .post(`${process.env.REACT_APP_POST_URL}/builtexercise`, {
          name: build.name,
          equipment: build.equipment,
          muscle: build.muscle,
          exercise: build.exercise,
        })
        .then(res => console.log('Post Success!'))
        .catch(e => console.log(e))
      dispatch({
        type: 'EXaction',
        exercises: [
          ...exercises,
          {
            id: exercises.length + 1,
            name: build.name,
            muscles: build.muscle,
            exercises: build.exercise,
            equipment: build.equipment,
          }
        ]
      })
      setBuild({})
    } else alert('All fields required.')
  }

  return (
    <>
      <div className="build">
        <p>Exercise Name: {build.name}</p>
        <p>Equipment: {build.equipment}</p>
        <p>Muscle: {build.muscle}</p>
        <p>Exercise: {build.exercise}</p>
      </div>
      <form onSubmit={e => submitBuild(e)}>
        <Button text="Submit"></Button>
      </form>
    </>
  )
}

export default ExerciseViewer
