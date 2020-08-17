/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './state'

import Authenticate from './components/authenticate'
import Layout from './layouts/layout'
import Keystone from './views/keystone';
import Sidebar from './components/sidebar';

import useUpdate from './hooks/useUpdate';
import Landing from './layouts/landing';

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
      <Router>
        {!isAuthenticated && <>
          <Route exact path='/' render={() => (
            <Landing />
          )} />
        </>}
        <Route path='/' render={() => (
          <Layout>
            {isAuthenticated && <>
              <Sidebar />
              <Keystone />
            </>}
          </Layout>
        )} />
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