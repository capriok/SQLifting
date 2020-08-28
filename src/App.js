/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useStateValue } from './state'
import useUpdate from './utils/useUpdate';
import useWeather from './utils/useWeather';
import LandingLayout from './layouts/landing-layout';

import Authenticate from './components/authenticate'
import Navbar from './components/navbar'
import MainLayout from './layouts/main-layout'
import Sidebar from './components/sidebar';
import Keystone from './components/keystone';

function App() {
  const [{
    user: {
      isAuthenticated
    },
    compositions: {
      equipments,
      muscles,
      exercises,
      movements },
    composites: {
      excos,
      wocos,
      circs
    }
  }] = useStateValue()
  const update = useUpdate()

  const [SB, setSB] = useState(false)

  useEffect(() => {
    if (isAuthenticated) update('all')
  }, [])

  useWeather()

  const log = (message, arg) => {
    arg.length > 0 && setTimeout(() => {
      console.log(`%c${message}`, 'color: lightskyblue', arg.length)
    }, 100)
  };
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
        {!isAuthenticated
          ? <Route exact path='/' render={() => (
            <LandingLayout />
          )} />
          :
          <Route path='/' render={() => (
            <>
              <Navbar SB={SB} set={setSB} />
              <MainLayout>
                <Sidebar open={SB} set={setSB} />
                <Keystone />
              </MainLayout>
            </>
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