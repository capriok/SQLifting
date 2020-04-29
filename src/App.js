import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from 'godspeed/build/Navbar'
import Database from './components/builders/database'
import ExerciseBuilder from './components/builders/exercise'
import WorkoutBuilder from './components/builders/workout'
import BuiltWorkouts from './components/BuiltWorkouts'
import './components/accordian.scss'

function App() {

  const [exerciseBuild, setExerciseBuild] = useState({
    id: undefined,
    name: undefined,
    muscle: undefined,
    exercise: undefined,
    equipment: undefined,
  })

  const [workoutBuild, setWorkoutBuild] = useState({
    name: undefined,
    workout: []
  })

  return (
    <>
      <Router>
        <div className="App">
          <Navbar title="SQLifting" titleWeight="300" to="/" shadow />
          <div className="head">
            <div className="center">
              <Link className="item" to="/database">Database Builder</Link>
              <Link className="item" to="/exercise">Exercise Builder</Link>
              <Link className="item" to="/workout">Workout Builder</Link>
              <Link className="item" to="/workouts">Built Workouts</Link>
            </div>
          </div>
          <div className="builder">
            <Route exact path="/" render={() => (
              // <Greeting />
              <h1>SQLifting</h1>
            )} />
            <Route path="/database" render={() => (
              <Database />
            )} />
            <Route path="/exercise" render={() => (
              <ExerciseBuilder build={exerciseBuild} setBuild={setExerciseBuild} />
            )} />
            <Route path="/workout" render={() => (
              <WorkoutBuilder build={workoutBuild} setBuild={setWorkoutBuild} />
            )} />
            <Route path="/workouts" render={() => (
              <BuiltWorkouts />
            )} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
