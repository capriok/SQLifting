import React from 'react'
import { useStateValue } from '../../state'

import Card from 'godspeed/build/Card'

console.log();


const Workouts = () => {
  const [{ workouts },] = useStateValue()
  return (
    <>
      <div className="left">
        {workouts.map(workout => {
          return (
            <Card className="built-workout">
              <h1 className="title">{workout.name}</h1>
              {workout.workout.map(exercise => (
                <>
                  <p className="sub-title">{exercise.name}</p>
                  <p className="li">Reps: {exercise.reps}</p>
                  <p className="li">Sets:  {exercise.sets}</p>
                </>
              ))}
            </Card>
          )
        })}
      </div>
      <div className="right">
      </div>
    </>
  )
}

export default Workouts
