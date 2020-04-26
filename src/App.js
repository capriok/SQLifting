import React, { useEffect, useState } from 'react';
import { useStateValue } from './state'
import Navbar from 'godspeed/build/Navbar'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'
import Database from './components/database'
import Workouts from './components/workouts'

function App() {
  const [{ data, workouts }, dispatch] = useStateValue()

  useEffect(() => {
    console.log(workouts);
  }, [workouts])
  return (
    <>
      <Navbar title="SQLifting" />
      <div className="App">
        <div className="head">
          <div className="center">
            <div>Add to database</div>
            <div>See Workouts</div>
          </div>
        </div>
        <div className="main">
          <div className="database">
            <Database />
          </div>
          <div className="workouts">
            <Workouts />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
