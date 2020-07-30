import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./state";
import App from './App';
import './App.scss';
import './Index.scss';

import 'react-tippy/dist/tippy.css'
import 'react-draggable-array/dist/index.css'

export default function Index() {
  let initialState = {
    user: {
      isAuthenticated: false,
      token: '',
      details: {
        uid: '',
        name: ''
      }
    },
    compositions: {
      equipments: [],
      muscles: [],
      exercises: [],
      movements: []
    },
    composites: {
      exercises: [],
      workouts: [],
      circuits: []
    },
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
      case "AUTHORIZATION":
        return {
          ...state,
          user: action.user
        };
      case "LOGOUT":
        return {
          ...state,
          user: {
            isAuthenticated: false,
            token: '',
            details: {
              user_id: undefined,
              username: ''
            }
          }
        };
      case "COMPOSITION_ACTION":
        return {
          ...state,
          compositions: action.compositions
        };
      case "COMPOSITE_ACTION":
        return {
          ...state,
          composites: action.composites
        };
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

  console.log('Welcome to SQLifting');

  let LStoken = localStorage.getItem('SQLifting-token')
  let LSuser = JSON.parse(localStorage.getItem('SQLifting-user'))
  if (LStoken && LSuser) {
    initialState.user.token = LStoken
    initialState.user.isAuthenticated = true
    initialState.user.details.uid = parseFloat(LSuser.uid)
    initialState.user.details.name = LSuser.name
    console.log('Logged in as -> ', initialState.user.details.name, `(${initialState.user.details.uid})`);
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

