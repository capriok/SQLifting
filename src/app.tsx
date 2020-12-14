/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useStateValue } from './global/state'
import useUpdate from './utils/useUpdate';

import LandingLayout from './layouts/landing-layout';
import Authenticate from './components/common/authenticate'
import MainLayout from './layouts/main-layout'
import Navbar from './components/common/navbar'
import Sidebar from './components/sidebar/sidebar';
import Keystone from './components/common/keystone';

const App: React.FC = () => {
  const [{ user, compositions, composites }] = useStateValue()

  const update = useUpdate()

  useEffect(() => {
    if (user.isAuthenticated) update('all')
  }, [])

  const log = (message: string, arg: any[]) => {
    arg.length > 0 && setTimeout(() => {
      console.log(`%c${message}`, 'color: lightskyblue', arg.length)
    }, 100)
  };
  useEffect(() => { log('Equipment', compositions.equipments) }, [compositions.equipments])
  useEffect(() => { log('Muscles', compositions.muscles) }, [compositions.muscles])
  useEffect(() => { log('Exercises', compositions.exercises) }, [compositions.exercises])
  useEffect(() => { log('Movements', compositions.movements) }, [compositions.movements])
  useEffect(() => { log('Excos', composites.exercises) }, [composites.exercises])
  useEffect(() => { log('Wocos', composites.circuits) }, [composites.circuits])
  useEffect(() => { log('Circs', composites.workouts) }, [composites.workouts])

  return (
    <>
      <Router>
        {!user.isAuthenticated
          ? <Route exact path='/' render={() => (
            <LandingLayout />
          )} />
          :
          <Route path='/' render={() => (
            <>
              <Navbar />
              <MainLayout>
                <Sidebar />
                <Keystone />
              </MainLayout>
            </>
          )} />
        }
        {!user.isAuthenticated && <>
          <Route path='/login' render={() => (
            <Authenticate />
          )} />
        </>}
      </Router>
    </>
  );
}
export default App
