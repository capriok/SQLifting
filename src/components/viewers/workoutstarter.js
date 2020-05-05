import React from 'react'
import Button from 'godspeed/build/Button'

const WorkoutStarter = ({ workout }) => {

  const StartWorkout = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="build">
        <div className="workout-starter">
          <p className="title">Workout Name: {workout.name}</p>
          {workout.workout.map((workout) => (
            <>
              <p className="sub-title">{workout.name}</p>
              <p className="li">Equipment: {workout.exercise.equipment}</p>
              <p className="li">Movement: {workout.exercise.exercise}</p>
              <p className="li">Reps: {workout.reps}</p>
              <p className="li">Sets: {workout.sets}</p>
            </>
          ))}
        </div>
      </div>
      <form onSubmit={e => StartWorkout(e)}>
        <Button text="Start Workout"></Button>
      </form>
    </>
  )
}

export default WorkoutStarter
