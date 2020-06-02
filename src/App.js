import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import axios from 'axios'
import Navbar from 'godspeed/build/Navbar'
import NavLink from 'godspeed/build/NavLink'
import Modal from 'godspeed/build/Modal'
import DatabaseManager from './components/database-manager'
import ExerciseBuilder from './components/exercise-builder'
import WorkoutBuilder from './components/workout-builder'
import BuiltWorkouts from './components/built-workouts'
import InProgress from './components/in-progress'
import LogBox from './components/log-box'

function App() {
  if (process.env.NODE_ENV !== 'development') console.log = () => { }
  const [{ user, data, exercises, workouts }, dispatch] = useStateValue()
  const queryParams = { params: { user_id: user.details.user_id } }

  const [logModalOpen, openLogModal] = useState(false)

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

  useEffect(() => { data.equipment.length > 0 && console.log('Data.Equipment', data.equipment) }, [data.equipment])
  useEffect(() => { data.muscles.length > 0 && console.log('Data.Muscles', data.muscles) }, [data.muscles])
  useEffect(() => { data.exercises.length > 0 && console.log('Data.Exercises', data.exercises) }, [data.exercises])
  useEffect(() => { exercises.length > 0 && console.log('Built Exercises', exercises) }, [exercises])
  useEffect(() => { workouts.length > 0 && console.log('Built Workouts', workouts) }, [workouts])
  useEffect(() => { exerciseBuild.name && console.log('Exercise Build', exerciseBuild) }, [exerciseBuild])
  useEffect(() => { workoutBuild.workout.length > 0 && console.log('Workout Build', workoutBuild) }, [workoutBuild])

  const populateData = async (type) => {
    switch (type) {
      case undefined:
        try {
          const data = {}
          await axios
            .all([
              axios.get(process.env.REACT_APP_GET + '/equipment', queryParams),
              axios.get(process.env.REACT_APP_GET + '/muscles', queryParams),
              axios.get(process.env.REACT_APP_GET + '/exercises', queryParams)
            ])
            .then(
              axios.spread((...res) => {
                data.equipment = res[0].data
                data.muscles = res[1].data
                data.exercises = res[2].data
                data.equipment.forEach(item => {
                  item.checked = false
                  item.name = item.name.toLowerCase()
                });
                data.muscles.forEach(item => {
                  item.checked = false
                  item.name = item.name.toLowerCase()
                });
                data.exercises.forEach(item => {
                  item.checked = false
                  item.name = item.name.toLowerCase()
                });
                dispatch({
                  type: 'DBaction',
                  data: {
                    equipment: data.equipment.sort((a, b) => (a.name > b.name) ? 1 : -1),
                    muscles: data.muscles.sort((a, b) => (a.name > b.name) ? 1 : -1),
                    exercises: data.exercises.sort((a, b) => (a.name > b.name) ? 1 : -1)
                  }
                })
              }))
            .catch(e => console.error(e.message))
        }
        catch (error) {
          console.log(error, 'Could not populate data');
        }
        if (type !== undefined) console.log('type', undefined);
        break;
      case 'equipment':
        axios
          .get(process.env.REACT_APP_GET + '/equipment', queryParams)
          .then(res => {
            data.equipment = res.data
            data.equipment.forEach(item => {
              item.checked = false
              item.name = item.name.toLowerCase()
            })
            dispatch({
              type: 'DBaction',
              data: { ...data, equipment: data.equipment.sort((a, b) => (a.name > b.name) ? 1 : -1) }
            })
          })
          .catch(e => console.error(e.message))
        break;
      case 'muscles':
        axios
          .get(process.env.REACT_APP_GET + '/muscles', queryParams)
          .then(res => {
            data.muscles = res.data
            data.muscles.forEach(item => {
              item.checked = false
              item.name = item.name.toLowerCase()
            })
            dispatch({
              type: 'DBaction',
              data: { ...data, muscles: data.muscles.sort((a, b) => (a.name > b.name) ? 1 : -1) }
            })
          })
          .catch(e => console.error(e.message))
        break;
      case 'exercises':
        axios
          .get(process.env.REACT_APP_GET + '/exercises', queryParams)
          .then(res => {
            data.exercises = res.data
            data.exercises.forEach(item => {
              item.checked = false
              item.name = item.name.toLowerCase()
            })
            dispatch({
              type: 'DBaction',
              data: { ...data, exercises: data.exercises.sort((a, b) => (a.name > b.name) ? 1 : -1) }
            })
          })
          .catch(e => console.error(e.message))
        break;
      default:
        break;
    }
  }

  const populateExercises = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_GET + '/builtexercises', queryParams)
        .then(res => {
          res.data.forEach(item => {
            item.checked = false
            item.name = item.name.toLowerCase()
          });
          dispatch({
            type: 'EXaction',
            exercises: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
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
        .get(process.env.REACT_APP_GET + '/builtworkouts', queryParams)
        .then(res => {
          res.data.forEach(item => {
            item.checked = false
            item.name = item.name.toLowerCase()
          });
          dispatch({
            type: 'WOaction',
            workouts: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
          })
        }
        )
        .catch(e => console.error(e.message))
    } catch (error) {
      console.log(error, 'Could not populate data');
    }
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      populateData()
      populateExercises()
      populateWorkouts()
    }
  }, [])

  const controlDBCheckbox = (i, type, prop, setter) => {
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
      case 'workouts':
        copy = [...workouts]
        flipbox()
        dispatch({ type: 'WOaction', workouts: copy })
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
      default:
        break;
    }
  }

  const controlEXRadio = (i, prop) => {
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
      case 'muscles':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          muscle: copy[i].name
        })
        break;
      case 'exercises':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          exercise: copy[i].name
        })
        break;
      default:
        break;
    }
  }

  const controlWOCheckbox = (i, name) => {
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
    const copy = [...workouts]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({ type: 'WOaction', workouts: copy })
    setPickedWorkout(item)
  }

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

  const logoutActions = async () => {
    await dispatch({ type: 'logout' })
    localStorage.removeItem('SQLifting-token')
    localStorage.removeItem('SQLifting-user')
    window.location.pathname = '/'
  }

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

export default App;

