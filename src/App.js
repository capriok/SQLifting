import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import axios from 'axios'
import Navbar from 'godspeed/build/Navbar'
import Database from './components/builders/databasebuilder'
import ExerciseBuilder from './components/builders/exercisebuilder'
import WorkoutBuilder from './components/builders/workoutbuilder'
import BuiltWorkouts from './components/viewers/builtworkouts'
import './components/accordian.scss'

function App() {
  const [{ data, exercises, workouts },] = useStateValue()

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

  const retrieveFromDatabase = (type) => {
    axios
      .get(`http://localhost:9000/.netlify/functions/server/api/get/${type}`)
      .then(res => console.log(res.data.map(data => Object.values(data)[0])))
  }

  useEffect(() => { data.muscles.length > 0 && console.log(data.muscles) }, [data.muscles])
  useEffect(() => { data.exercises.length > 0 && console.log(data.exercises) }, [data.exercises])
  useEffect(() => { data.equipment.length > 0 && console.log(data.equipment) }, [data.equipment])
  useEffect(() => { exercises.length > 0 && console.log(exercises) }, [exercises])
  useEffect(() => { workouts.length > 0 && console.log(workouts) }, [workouts])

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
              <Database retrieveFromDatabase={retrieveFromDatabase} />
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
