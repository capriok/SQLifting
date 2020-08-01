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
import usePopulator from './hooks/usePopulator';

function App() {
  if (process.env.NODE_ENV !== 'development') console.log = () => { }
  const [{
    user: { isAuthenticated },
    compositions: { equipments, muscles, exercises, movements },
    composites: { excos, wocos, circs }
  }, dispatch] = useStateValue()
  const updatePopulation = usePopulator()

  const [pickedWorkout, setPickedWorkout] = useState({
    id: undefined,
    name: undefined,
    woco_excos: []
  })

  useEffect(() => {
    if (isAuthenticated) updatePopulation()
  }, [])

  const logoutActions = async () => {
    await dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('SQLifting-token')
    localStorage.removeItem('SQLifting-user')
    window.location.pathname = '/'
  }

  const log = (message, arg) => arg.length > 0 && console.log(message, arg.length)
  useEffect(() => { log('Equipment', equipments) }, [equipments])
  useEffect(() => { log('Muscles', muscles) }, [muscles])
  useEffect(() => { log('Exercises', exercises) }, [exercises])
  useEffect(() => { log('Movements', movements) }, [movements])
  useEffect(() => { log('Excos', excos) }, [excos])
  useEffect(() => { log('Wocos', wocos) }, [wocos])
  useEffect(() => { log('Circs', circs) }, [circs])

  return (
    <>
      <Router>
        <Navbar className="navbar" title="SQLifting" titleWeight="300" shadow>
          {isAuthenticated &&
            <NavLink hover="steelblue" onClick={() => logoutActions()}>
              Logout
          </NavLink>
          }
        </Navbar>
        <div className="app">
          <div className="action-bar">
            {isAuthenticated
              ? <>
                <Link className="item" to="/database">Database Manager</Link>
                <Link className="item" to="/exercise-builder">Exercise Builder</Link>
                <Link className="item" to="/workout-builder">Workout Builder</Link>
                <Link className="item" to="/workouts">Built Workouts</Link>
              </>
              : <div className="greeting">Welcome to SQLifting</div>
            }
          </div>
          {isAuthenticated
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