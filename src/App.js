import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import axios from 'axios'
import Navbar from 'godspeed/build/Navbar'
import DatabaseBuilder from './components/builders/databasebuilder'
import ExerciseBuilder from './components/builders/exercisebuilder'
import WorkoutBuilder from './components/builders/workoutbuilder'
import BuiltWorkouts from './components/viewers/builtworkouts'
import './components/accordian.scss'

function App() {
  const [{ data, exercises, workouts }, dispatch] = useStateValue()

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

  useEffect(() => { data.muscles.length > 0 && console.log('Data.Muscles', data.muscles) }, [data.muscles])
  useEffect(() => { data.exercises.length > 0 && console.log('Data.Exercises', data.exercises) }, [data.exercises])
  useEffect(() => { data.equipment.length > 0 && console.log('Data.Equipment', data.equipment) }, [data.equipment])
  useEffect(() => { exercises.length > 0 && console.log('Built Exercises', exercises) }, [exercises])
  useEffect(() => { workouts.length > 0 && console.log('Built Workouts', workouts) }, [workouts])
  useEffect(() => { workoutBuild.workout.length > 0 && console.log('Workout Build', workoutBuild) }, [workoutBuild])

  const populateData = async () => {
    const data = {}
    await axios
      .all([
        axios.get(`${process.env.REACT_APP_GET_URL}/muscles`),
        axios.get(`${process.env.REACT_APP_GET_URL}/exercises`),
        axios.get(`${process.env.REACT_APP_GET_URL}/equipment`)
      ])
      .then(
        axios.spread((...res) => {
          data.muscles = res[0].data
          data.exercises = res[1].data
          data.equipment = res[2].data
        })
      )
      .catch(e => console.error(e.message))
    dispatch({
      type: 'DBaction',
      data: {
        muscles: data.muscles,
        exercises: data.exercises,
        equipment: data.equipment
      }
    })
  }

  const populateExercises = async () => {
    await axios
      .get(`${process.env.REACT_APP_GET_URL}/builtexercises`)
      .then(res => {
        dispatch({
          type: 'EXaction',
          exercises: res.data
        })
      }
      )
      .catch(e => console.error(e.message))
  }

  const populateWorkouts = async () => {
    await axios
      .get(`${process.env.REACT_APP_GET_URL}/builtworkouts`)
      .then(res => {
        dispatch({
          type: 'WOaction',
          workouts: res.data
        })
      }
      )
      .catch(e => console.error(e.message))
  }

  useEffect(() => {
    populateData()
    populateExercises()
    populateWorkouts()
  }, [])

  const updatePopulation = () => {
    populateData()
    populateExercises()
    populateWorkouts()
  }

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
              <DatabaseBuilder updatePopulation={updatePopulation} />
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
