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
      circs: [],
      excos: [],
      wocos: []
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
      default:
        return state;
    }
  }

  const log = (message) => console.log(`%c${message}`, 'color: white')

  console.log('%cWelcome to SQLifting', ' color: white; font-family: Verdana; font-size: 1.5rem; border-bottom: 2px solid lightskyblue; margin: 20px 0');

  if (process.env.NODE_ENV === 'production') console.log = () => { }

  log('-------------------------TASKS-------------------------')
  log('When deleting any composition:')
  log('-- note: cannot just delete composition')
  log('   -- exco deps will be incomplete')
  log('   -- woco exco deps will be incomplete')
  log('-- option 1: set uid to null of any composition deleted')
  log('-- option 2: delete composition and the composites associated with it')
  log('When deleting a woco:')
  log('-- must delete woco_excos for that woco_id')
  log('Feature to edit composite name')
  log('-------------------------------------------------------')
  log('')

  let LStoken = localStorage.getItem('SQLifting-token')
  let LSuser = JSON.parse(localStorage.getItem('SQLifting-user'))
  if (LStoken && LSuser) {
    initialState.user.token = LStoken
    initialState.user.isAuthenticated = true
    initialState.user.details.uid = parseFloat(LSuser.uid)
    initialState.user.details.name = LSuser.name
    log(`Logged in as -> ${initialState.user.details.name} (${initialState.user.details.uid})`);
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

