/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './state'

import Authenticate from './components/authenticate'
import MainLayout from './layouts/main-layout'
import Keystone from './components/keystone';
import Sidebar from './components/sidebar';

import useUpdate from './hooks/useUpdate';
import LandingLayout from './layouts/landing-layout';

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
        {!isAuthenticated
          ? <Route exact path='/' render={() => (
            <LandingLayout />
          )} />
          :
          <Route path='/' render={() => (
            <MainLayout>
              <Sidebar />
              <Keystone />
            </MainLayout>
          )} />
        }
        {!isAuthenticated && <>
          <Route path='/login' render={() => (
            <Authenticate />
          )} />
        </>}
      </Router>
    </>
  );
}
export default App