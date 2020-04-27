import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import Button from 'godspeed/build/Button'

const ExerciseViewer = ({ build }) => {
  const [{ exercises }, dispatch] = useStateValue()

  const submitBuild = () => {
    const buildValues = Object.values(build)
    let hasUndefined = false
    buildValues.forEach((v) => {
      if (v === undefined) hasUndefined = true
    })
    console.log(hasUndefined);
    if (!hasUndefined) {
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
    }
    console.log(build);
  }

  useEffect(() => {
    console.log(exercises)
  }, [exercises])

  return (
    <>
      <h1>Viewer</h1>
      <div className="build">
        <div>Exercise Name: {build.name}</div>
        <div>Muscle: {build.muscle}</div>
        <div>Exercise: {build.exercise}</div>
        <div>Equipment: {build.equipment}</div>
      </div>
      <form onSubmit={e => {
        e.preventDefault()
        submitBuild()
      }}>
        <Button text="Submit"></Button>
      </form>
    </>
  )
}

export default ExerciseViewer
