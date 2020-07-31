/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStateValue } from './state'
import { Navbar, NavLink } from 'godspeed'
import DatabaseManager from './components/database-manager'
import ExerciseBuilder from './components/exercise-builder'
import WorkoutBuilder from './components/workout-builder'
import BuiltWorkouts from './components/built-workouts'
import InProgress from './components/in-progress'
import LogBox from './components/log-box'
import useUpdatePopulation from './hooks/useUpdatePopulation';

function App() {
  if (process.env.NODE_ENV !== 'development') console.log = () => { }
  const [{
    user,
    compositions: {
      equipments,
      muscles,
      exercises,
      movements
    },
    composites: {
      excos,
      wocos,
      circos
    }
  }, dispatch] = useStateValue()
  const updatePopulation = useUpdatePopulation()

  const [pickedWorkout, setPickedWorkout] = useState({
    name: undefined,
    workout: []
  })

  useEffect(() => {
    if (user.isAuthenticated) updatePopulation()
  }, [])

  const logoutActions = async () => {
    await dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('SQLifting-token')
    localStorage.removeItem('SQLifting-user')
    window.location.pathname = '/'
  }

  const log = (message, arg) => arg.length > 0 && console.log(message, arg)

  useEffect(() => { log('Equipment', equipments.length) }, [equipments])
  useEffect(() => { log('Muscles', muscles.length) }, [muscles])
  useEffect(() => { log('Exercises', exercises.length) }, [exercises])
  useEffect(() => { log('Movements', movements.length) }, [movements])
  useEffect(() => { log('Excos', excos.length) }, [excos])
  useEffect(() => { log('Wocos', wocos.length) }, [wocos])
  useEffect(() => { log('Circs', circos.length) }, [circos])

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
                <DatabaseManager />
              )} />
              <Route exact path="/exercise-builder" render={() => (
                <ExerciseBuilder />
              )} />
              <Route exact path="/workout-builder" render={() => (
                <WorkoutBuilder />
              )} />
              <Route exact path="/workouts" render={() => (
                <BuiltWorkouts
                  workout={pickedWorkout}
                  setWorkout={setPickedWorkout} />
              )} />
              <Route exact path="/workout-in-progress" render={() => (
                <InProgress
                  workout={pickedWorkout} />
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