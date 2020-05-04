import React from 'react'
import { useStateValue } from '../../state'

console.log();


const Workouts = () => {
  const [{ workouts },] = useStateValue()
  return (
    <>
      <div className="left">
        {workouts.map(workout => {
          return (
            <>
              <h1>{workout.name}</h1>
              {workout.workout.map(exercise => (
                <>
                  <p>{exercise.name}</p>
                  <p>{exercise.reps}</p>
                  <p>{exercise.sets}</p>
                </>
              ))}
            </>
          )
        })}
      </div>
      <div className="right">
      </div>
    </>
  )
}

export default Workouts
