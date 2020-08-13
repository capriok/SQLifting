/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './state'
import useUpdate from './hooks/useUpdate';

import Layout from './layouts/layout'
import Keystone from './views/keystone';
import Sidebar from './components/sidebar';

function App() {
  const [{
    user: { isAuthenticated },
    compositions: { equipments, muscles, exercises, movements },
    composites: { excos, wocos, circs }
  }, dispatch] = useStateValue()
  const update = useUpdate()

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
      <Layout>
        <Router>
          <Sidebar />
          <Keystone />
        </Router>
      </Layout>
    </>
  );
}


export default App



























// return (
//   <>
//     <Router>
//       <Navbar className="navbar" title="SQLifting" titleWeight="300" shadow>
//         {isAuthenticated &&
//           <NavLink hover="steelblue" onClick={() => logoutActions()}>
//             Logout
//         </NavLink>
//         }
//       </Navbar>
//       <div className="app">
//         <div className="action-bar">
//           {isAuthenticated
//             ? <>
//               <Link className="item" to="/database">Database Manager</Link>
//               <Link className="item" to="/exercise-builder">Exercise Builder</Link>
//               <Link className="item" to="/workout-builder">Workout Builder</Link>
//               <Link className="item" to="/workouts">Built Workouts</Link>
//             </>
//             : <div className="greeting">Welcome to SQLifting</div>
//           }
//         </div>
//         {isAuthenticated
//           ? <>
//             <Route path="/database" render={() => (
//               <DatabaseManager />
//             )} />
//             <Route exact path="/exercise-builder" render={() => (
//               <ExerciseBuilder />
//             )} />
//             <Route exact path="/workout-builder" render={() => (
//               <WorkoutBuilder />
//             )} />
//             <Route exact path="/workouts" render={() => (
//               <BuiltWorkouts
//                 workout={pickedWorkout}
//                 setWorkout={setPickedWorkout} />
//             )} />
//             <Route exact path="/workout-in-progress" render={() => (
//               <InProgress />
//             )} />
//           </>
//           : <LogBox />
//         }
//       </div>
//     </Router>
//   </>
// );