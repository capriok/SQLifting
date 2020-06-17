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
        user_id: '',
        username: ''
      }
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
      case "auth":
        return {
          ...state,
          user: action.user
        };
      case "logout":
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
    initialState.user.details.user_id = parseFloat(LSuser.user_id)
    initialState.user.details.username = LSuser.username
    console.log('Logged in as -> ', initialState.user.details.username, `(${initialState.user.details.user_id})`);
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

