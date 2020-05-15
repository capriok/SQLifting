import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./state";
import App from './App';
import './App.scss';
import './Index.scss';
import 'react-tippy/dist/tippy.css'

export default function Index() {

  let initialState = {
    exercises: [],
    workouts: [],
    data: {
      equipment: [],
      muscles: [],
      exercises: []
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

