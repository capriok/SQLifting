import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./state";
import App from './App';
import './App.scss';
import './Index.scss';

export default function Index() {

  let initialState = {
    workouts: [{
      id: 1,
      name: 'foo'
    }, {
      id: 2,
      name: 'bar'
    }, {
      id: 3,
      name: 'baz'
    }],
    data: {
      muscles: [],
      exercises: [],
      equipment: []
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
      default:
        return state;
    }
  }

  useEffect(() => {
    console.log(initialState.data)
  }, [initialState.data])

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </>
  );
}


ReactDOM.render(<Index />, document.getElementById('root'))