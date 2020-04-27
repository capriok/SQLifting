import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./state";
import App from './App';
import './App.scss';
import './Index.scss';

export default function Index() {

  let initialState = {
    exercises: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }],
    workouts: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }],
    data: {
      muscles: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }],
      exercises: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }],
      equipment: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }],
      reps: [{ id: 1, count: 1 }, { id: 2, count: 4 }, { id: 3, count: 8 },],
      sets: [{ id: 1, count: 1 }, { id: 2, count: 2 }, { id: 3, count: 4 },]
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