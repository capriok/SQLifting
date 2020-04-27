import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import Navbar from 'godspeed/build/Navbar'
import Database from './components/builders/database'
import ExerciseBuilder from './components/builders/exercise'
import WorkoutBuilder from './components/builders/workout'
import './components/accordian.scss'

function App() {
  const [{ data, workouts }, dispatch] = useStateValue()

  const [exerciseBuild, setExerciseBuild] = useState({
    name: undefined,
    muscle: undefined,
    equipment: undefined,
  })
  const [workoutBuild, setWorkoutBuild] = useState([])

  return (
    <>
      <Router>
        <div className="App">
          <Navbar title="SQLifting" to="/" />
          <div className="head">
            <div className="center">
              <Link to="/database">Database Builder</Link>
              <Link to="/exercise">Exercise Builder</Link>
              <Link to="/workout">Workout Builder</Link>
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
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
