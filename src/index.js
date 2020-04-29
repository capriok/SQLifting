import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./state";
import App from './App';
import './App.scss';
import './Index.scss';

export default function Index() {

  let initialState = {
    exercises: [{
      id: undefined,
      name: undefined,
      muscles: undefined,
      exercise: undefined,
      equipment: undefined
    }],
    workouts: [{
      name: undefined,
      workout: [{
        id: undefined,
        exercise: undefined,
        reps: undefined,
        sets: undefined
      }]
    }],
    data: {
      muscles: [{
        id: undefined,
        name: undefined
      }],
      exercises: [{
        id: undefined,
        name: undefined
      }],
      equipment: [{
        id: undefined,
        name: undefined
      }],
      reps: [{
        id: undefined,
        name: undefined
      }],
      sets: [{
        id: undefined,
        name: undefined
      }]
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "DBaction":
        return {
          ...state,
          data: action.data
        };
      case "WOaction":
        return {
          ...state,
          workouts: action.workouts
        };
      case "EXaction":
        return {
          ...state,
          exercises: action.exercises
        };
      default:
        return state;
    }
  }

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </>
  );
}


ReactDOM.render(<Index />, document.getElementById('root'))

