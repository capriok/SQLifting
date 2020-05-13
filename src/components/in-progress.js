import React, { useEffect } from 'react'

const InProgress = ({ resetAllBoxes, workout }) => {

  return (
    <>
      <h1>In Progress</h1>
      {workout.workout.map((workout, i) => (
        <>
          <div className="workout-item" key={i}>
            <p className="item-title">{workout.name}</p>
            <div className="item">
              <div className="item-details">
                <p>Equipment: {workout.exercise.equipment}</p>
                <p>Movement: {workout.exercise.exercise}</p>
              </div>
              <div className="item-count">
                <p>Reps: {workout.reps}</p>
                <p>Sets: {workout.sets}</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  )
}

export default InProgress