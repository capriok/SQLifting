import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import axios from 'axios'
import Navbar from 'godspeed/build/Navbar'
import DatabaseManager from './components/database-manager'
import ExerciseBuilder from './components/exercise-builder'
import WorkoutBuilder from './components/workout-builder'
import BuiltWorkouts from './components/built-workouts'
import InProgress from './components/in-progress'

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
  useEffect(() => { exerciseBuild.name && console.log('Exercise Build', exerciseBuild) }, [exerciseBuild])
  useEffect(() => { workoutBuild.workout.length > 0 && console.log('Workout Build', workoutBuild) }, [workoutBuild])

  const populateData = async () => {
    try {
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
            dispatch({
              type: 'DBaction',
              data: {
                muscles: data.muscles,
                exercises: data.exercises,
                equipment: data.equipment
              }
            })
          }))
        .catch(e => console.error(e.message))

    }
    catch (error) {
      console.log(error, 'Could not populate data');
    }
  }

  const populateExercises = async () => {
    try {
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
    } catch (error) {
      console.log(error, 'Could not populate data');
    }
  }

  const populateWorkouts = async () => {
    try {
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
    } catch (error) {
      console.log(error, 'Could not populate data');
    }
  }

  useEffect(() => {
    populateData()
    populateExercises()
    populateWorkouts()
  }, [])

  const controlDBCheckbox = (i, type, prop, setter) => {
    console.log(`index of '${i}', type of '${type}', prop of '${prop}'`);
    let copy
    const flipbox = () => copy[i].checked = !copy[i].checked
    let selection = []
    switch (type) {
      case 'data':
        copy = [...data[prop]]
        flipbox()
        dispatch({ type: 'DBaction', data: { ...data, copy } })
        copy.map((item) => {
          item.checked && selection.push(item.name)
          setter(selection)
        })
        break;
      case 'exercises':
        copy = [...exercises]
        flipbox()
        dispatch({ type: 'EXaction', exercises: copy })
        copy.map((item) => {
          item.checked && selection.push(item.name)
          setter(selection)
        })
        break;
      case 'workouts':
        copy = [...workouts]
        flipbox()
        dispatch({ type: 'WOaction', workouts: copy })
        copy.map((item) => {
          item.checked && selection.push(item.name)
          setter(selection)
        })
        break;
      default:
        break;
    }
  }

  const controlEXRadio = (i, prop) => {
    console.log(`index of '${i}', prop of '${prop}'`);
    const copy = [...data[prop]]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({ type: 'DBaction', data: { ...data, copy } })
    switch (prop) {
      case 'equipment':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          equipment: copy[i].name
        })
        break;
      case 'exercises':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          exercise: copy[i].name
        })
        break;
      case 'muscles':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          muscle: copy[i].name
        })
        break;
      default:
        break;
    }
  }

  const controlWOCheckbox = (i, name) => {
    console.log(`index of '${i}', name of '${name}'`);
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

  const controlBWRadio = (i, item) => {
    console.log(`index of '${i}'`);
    console.log(item);

    const copy = [...workouts]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({ type: 'WOaction', workouts: copy })
    setPickedWorkout(item)
  }

  const resetAllBoxes = () => {
    let { equipment: dataEQ, exercises: dataEX, muscles: dataMU } = data
    let WO = workouts
    let EX = exercises
    const reset = data => {
      data.forEach(data => data.checked = false)
    }
    reset(dataEQ)
    reset(dataEX)
    reset(dataMU)
    reset(EX)
    reset(WO)
    dispatch({
      type: 'DBaction',
      data: {
        equipment: dataEQ,
        exercises: dataEX,
        muscles: dataMU
      }
    })
    dispatch({ type: 'EXaction', exercises: EX })
    dispatch({ type: 'WOaction', workouts: WO })
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
              updatePopulation={updatePopulation}
              resetAllBoxes={resetAllBoxes}
            />
          )} />
          <Route exact path="/exercise-builder" render={() => (
            <ExerciseBuilder
              controlEXRadio={controlEXRadio}
              updatePopulation={updatePopulation}
              resetAllBoxes={resetAllBoxes}
              build={exerciseBuild}
              setBuild={setExerciseBuild} />
          )} />
          <Route exact path="/workout-builder" render={() => (
            <WorkoutBuilder
              controlWOCheckbox={controlWOCheckbox}
              updatePopulation={updatePopulation}
              resetAllBoxes={resetAllBoxes}
              build={workoutBuild}
              setBuild={setWorkoutBuild} />
          )} />
          <Route exact path="/workouts" render={() => (
            <BuiltWorkouts
              controlBWRadio={controlBWRadio}
              updatePopulation={updatePopulation}
              resetAllBoxes={resetAllBoxes}
              workout={pickedWorkout} />
          )} />
          <Route exact path="/workout-in-progress" render={() => (
            <InProgress
              workout={pickedWorkout}
              resetAllBoxes={resetAllBoxes} />
          )} />
        </div>
      </Router>
    </>
  );
}

export default App;

