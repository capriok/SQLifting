import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import Navbar from 'godspeed/build/Navbar'
import NavLink from 'godspeed/build/NavLink'
import DatabaseManager from './components/database-manager'
import ExerciseBuilder from './components/exercise-builder'
import WorkoutBuilder from './components/workout-builder'
import BuiltWorkouts from './components/built-workouts'
import InProgress from './components/in-progress'
import LogBox from './components/log-box'
import useFetchData from './hooks/useFetchData';
import useBoxControl from './hooks/useBoxControl';
import useRadioControl from './hooks/useRadioControl';

function App() {
  if (process.env.NODE_ENV !== 'development') console.log = () => { }
  const [{ user, data, exercises, workouts }, dispatch] = useStateValue()

  const [exerciseBuild, setExerciseBuild] = useState({
    id: undefined,
    name: '',
    equipment: undefined,
    muscle: undefined,
    exercise: undefined
  })

  const [workoutBuild, setWorkoutBuild] = useState({
    name: undefined,
    workout: []
  })

  const [pickedWorkout, setPickedWorkout] = useState({
    name: undefined,
    workout: []
  })

  const { populateData, populateExercises, populateWorkouts } = useFetchData()
  const { controlDBCheckbox, controlWOCheckbox } = useBoxControl(
    workoutBuild,
    setWorkoutBuild
  )
  const { controlBWRadio, controlEXRadio } = useRadioControl(
    exerciseBuild,
    setExerciseBuild,
    setPickedWorkout
  )

  const updatePopulation = (type) => {
    switch (type) {
      case undefined:
        populateData()
        populateExercises()
        populateWorkouts()
        break;
      case 'equipment':
        populateData('equipment')
        break;
      case 'muscle':
        populateData('muscles')
        break;
      case 'exercise':
        populateData('exercises')
        break;
      case 'exercises':
        populateExercises()
        break;
      case 'workouts':
        populateWorkouts()
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      updatePopulation()
    }
  }, [])


  const resetAllBoxes = () => {
    let { equipment: dataEQ, muscles: dataMU, exercises: dataEX } = data
    let WO = workouts
    let EX = exercises
    const reset = data => {
      data.forEach(data => data.checked = false)
    }
    reset(dataEQ)
    reset(dataMU)
    reset(dataEX)
    reset(EX)
    reset(WO)
    dispatch({
      type: 'DBaction',
      data: {
        equipment: dataEQ,
        muscles: dataMU,
        exercises: dataEX
      }
    })
    dispatch({ type: 'EXaction', exercises: EX })
    dispatch({ type: 'WOaction', workouts: WO })
  }

  const logoutActions = async () => {
    await dispatch({ type: 'logout' })
    localStorage.removeItem('SQLifting-token')
    localStorage.removeItem('SQLifting-user')
    window.location.pathname = '/'
  }

  useEffect(() => { data.equipment.length > 0 && console.log('Data.Equipment', data.equipment) }, [data.equipment])
  useEffect(() => { data.muscles.length > 0 && console.log('Data.Muscles', data.muscles) }, [data.muscles])
  useEffect(() => { data.exercises.length > 0 && console.log('Data.Exercises', data.exercises) }, [data.exercises])
  useEffect(() => { exercises.length > 0 && console.log('Built Exercises', exercises) }, [exercises])
  useEffect(() => { workouts.length > 0 && console.log('Built Workouts', workouts) }, [workouts])
  useEffect(() => { exerciseBuild.name && console.log('Exercise Build', exerciseBuild) }, [exerciseBuild])
  useEffect(() => { workoutBuild.workout.length > 0 && console.log('Workout Build', workoutBuild) }, [workoutBuild])

  return (
    <>
      <Router>
        <Navbar className="navbar" title="SQLifting" titleWeight="300" shadow>
          {user.isAuthenticated &&
            <NavLink hover="steelblue" onClick={() => logoutActions()}>
              Logout
          </NavLink>
          }
        </Navbar>
        <div className="app">
          <div className="action-bar">
            {user.isAuthenticated
              ? <>
                <Link className="item" to="/database">Database Manager</Link>
                <Link className="item" to="/exercise-builder">Exercise Builder</Link>
                <Link className="item" to="/workout-builder">Workout Builder</Link>
                <Link className="item" to="/workouts">Built Workouts</Link>
              </>
              : <div className="greeting">Welcome to SQLifting</div>
            }
          </div>
          {user.isAuthenticated
            ? <>
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
                  workout={pickedWorkout}
                  setWorkout={setPickedWorkout} />
              )} />
              <Route exact path="/workout-in-progress" render={() => (
                <InProgress
                  workout={pickedWorkout}
                  resetAllBoxes={resetAllBoxes} />
              )} />
            </>
            : <LogBox />
          }
        </div>
      </Router>
    </>
  );
}

export default App