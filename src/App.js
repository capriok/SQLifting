import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import axios from 'axios'
import Navbar from 'godspeed/build/Navbar'
import DatabaseManager from './components/database-manager'
import ExerciseBuilder from './components/exercise-builder'
import WorkoutBuilder from './components/workout-builder'
import BuiltWorkouts from './components/built-workouts'

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

  const [pickedWorkout, setPickedWorkout] = useState({
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
        axios.get(process.env.REACT_APP_GET + '/equipment'),
        axios.get(process.env.REACT_APP_GET + '/exercises'),
        axios.get(process.env.REACT_APP_GET + '/muscles')
      ])
      .then(
        axios.spread((...res) => {
          data.equipment = res[0].data
          data.exercises = res[1].data
          data.muscles = res[2].data
          data.equipment.forEach(item => item.checked = false);
          data.exercises.forEach(item => item.checked = false);
          data.muscles.forEach(item => item.checked = false);
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
      .get(process.env.REACT_APP_GET + '/builtexercises')
      .then(res => {
        res.data.forEach(item => item.checked = false);
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
      .get(process.env.REACT_APP_GET + '/builtworkouts')
      .then(res => {
        res.data.forEach(item => item.checked = false);
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

  const controlDBCheckbox = (i, type, prop, setter) => {
    console.log(`index of '${i}', type of '${type}', prop of '${prop}'`);
    if (type === 'data') {
      const copy = [...data[prop]]
      copy[i].checked = !copy[i].checked
      dispatch({ type: 'DBaction', data: { ...data, copy } })
      let selection = []
      copy.map((item) => {
        item.checked && selection.push(item.name)
        setter(selection)
      })
    } else if (type === 'exercises') {
      const copy = [...exercises]
      copy[i].checked = !copy[i].checked
      dispatch({ type: 'EXaction', exercises: copy })
      let selection = []
      copy.map((item) => {
        item.checked && selection.push(item.name)
        setter(selection)
      })
    } else if (type === 'workouts') {
      const copy = [...workouts]
      copy[i].checked = !copy[i].checked
      dispatch({ type: 'WOaction', workouts: copy })
      let selection = []
      copy.map((item) => {
        item.checked && selection.push(item.name)
        setter(selection)
      })
    }
  }

  const controlEXRadio = (i, prop) => {
    console.log(`index of '${i}', prop of '${prop}'`);
    if (prop !== 'workout') {
      const copy = [...data[prop]]
      copy.forEach(item => item.checked = false);
      copy[i].checked = true
      dispatch({ type: 'DBaction', data: { ...data, copy } })
      if (prop === 'equipment') {
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          equipment: copy[i].name
        })
      } else if (prop === 'exercises') {
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          exercise: copy[i].name
        })
      } else {
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          muscle: copy[i].name
        })
      }
    }
  }

  const controlWOCheckbox = (i, type, name) => {
    console.log(`index of '${i}', type of '${type}', name of '${name}'`);
    const copy = [...exercises]
    let isDupe = false
    workoutBuild.workout.forEach(item => {
      if (item.name === name) isDupe = true
    });
    if (copy[i].checked) {
      let filteredWorkout = workoutBuild.workout.filter(item => {
        return item.name !== name
      })
      copy[i].checked = !copy[i].checked
      setWorkoutBuild({
        ...workoutBuild,
        workout: filteredWorkout
      })
      return
    }
    if (!isDupe && name) {
      copy[i].checked = !copy[i].checked
      setWorkoutBuild({
        ...workoutBuild,
        workout: [
          ...workoutBuild.workout,
          {
            id: workouts.length + 1,
            name: name,
            exercise: exercises[i],
            reps: 1,
            sets: 1
          }
        ]
      })
    }
  }

  const updatePopulation = () => {
    populateData()
    populateExercises()
    populateWorkouts()
  }

  return (
    <>
      <Router>
        <Navbar title="SQLifting" titleWeight="300" to="/" shadow />
        <div className="app">
          <div className="action-bar">
            <Link className="item" to="/database">Database Manager</Link>
            <Link className="item" to="/exercise-builder">Exercise Builder</Link>
            <Link className="item" to="/workout-builder">Workout Builder</Link>
            <Link className="item" to="/workouts">Built Workouts</Link>
          </div>
          <Route exact path="/" render={() => (
            <div className="greeting">Welcome to SQLifting</div>
          )} />
          <Route path="/database" render={() => (
            <DatabaseManager
              controlDBCheckbox={controlDBCheckbox}
              updatePopulation={updatePopulation} />
          )} />
          <Route exact path="/exercise-builder" render={() => (
            <ExerciseBuilder
              controlEXRadio={controlEXRadio}
              updatePopulation={updatePopulation}
              build={exerciseBuild}
              setBuild={setExerciseBuild} />
          )} />
          <Route exact path="/workout-builder" render={() => (
            <WorkoutBuilder
              controlWOCheckbox={controlWOCheckbox}
              updatePopulation={updatePopulation}
              build={workoutBuild}
              setBuild={setWorkoutBuild} />
          )} />
          <Route exact path="/workouts" render={() => (
            <BuiltWorkouts />
          )} />
        </div>
      </Router>
    </>
  );
}

export default App;

