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
import useUpdate from './hooks/useUpdate';

function App() {
  const [{
    user: { isAuthenticated },
    compositions: { equipments, muscles, exercises, movements },
    composites: { excos, wocos, circs }
  }, dispatch] = useStateValue()
  const update = useUpdate()

  const [pickedWorkout, setPickedWorkout] = useState({
    id: undefined,
    name: undefined,
    deps: []
  })

  useEffect(() => {
    if (isAuthenticated) update('all')
  }, [])

  const logoutActions = async () => {
    await dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('SQLifting-token')
    localStorage.removeItem('SQLifting-user')
    window.location.pathname = '/'
  }

  const lengthLog = (message, arg) => arg.length > 0 && setTimeout(() => console.log(`%c${message}`, 'color: lightskyblue', arg.length), 50);
  useEffect(() => { lengthLog('Equipment', equipments) }, [equipments])
  useEffect(() => { lengthLog('Muscles', muscles) }, [muscles])
  useEffect(() => { lengthLog('Exercises', exercises) }, [exercises])
  useEffect(() => { lengthLog('Movements', movements) }, [movements])
  useEffect(() => { lengthLog('Excos', excos) }, [excos])
  useEffect(() => { lengthLog('Wocos', wocos) }, [wocos])
  useEffect(() => { lengthLog('Circs', circs) }, [circs])

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
                <InProgress />
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