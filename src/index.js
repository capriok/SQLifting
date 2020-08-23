/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-extend-native: "off"*/
import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./state";
import App from './App';
import './Index.scss';

import 'react-tippy/dist/tippy.css'
import 'react-draggable-array/dist/index.css'

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
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
    weather: {},
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
    },
    active: {
      name: '',
      parent: {},
      entity: '',
      pathname: '',
    },
    actionState: {
      select: {
        state: false,
        selection: []
      },
      edit: {
        state: false,
        entity: {
          type: '',
          entType: '',
          ent: {}
        }
      }
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
              uid: undefined,
              username: ''
            }
          }
        };
      case "WEATHER_ACTION":
        return {
          ...state,
          weather: action.weather
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
      case "ACTIVE_ACTION":
        return {
          ...state,
          active: action.active
        };
      case "ACTIONSTATE_ACTION":
        return {
          ...state,
          actionState: action.actionState
        };
      case "ACTIONSTATE_RESET":
        return {
          ...state,
          actionState: {
            select: {
              state: false,
              selection: []
            },
            edit: {
              state: false,
              entity: {
                type: '',
                entType: '',
                ent: {}
              }
            }
          }
        };
      default:
        return state;
    }
  }

  const log = (message) => console.log(`%c${message}`, 'color: white')

  console.log('%cWelcome to SQLifting', 'color: white; font-family: Verdana; font-size: 1.5rem; border-bottom: 2px solid lightskyblue; margin: 20px 0');

  if (process.env.NODE_ENV === 'production') console.log = () => { }

  log('-------------------------TASKS-------------------------')
  log('- When deleting any composition:')
  log('     Must handle dependencies of deleted record')
  log('- Add composition injection to actio bar for manage view')
  log('- Hook up route and query for entity edit of name ')
  log('- Authentication should be done smarter')
  log('     JWT for routes involving account specific data')
  log('-------------------------------------------------------')
  log('')

  let LStoken = localStorage.getItem('SQLifting-token')
  let LSuser = JSON.parse(localStorage.getItem('SQLifting-user'))
  if (LStoken && LSuser) {
    initialState.user = {
      isAuthenticated: true,
      token: LStoken,
      details: {
        uid: LSuser.uid,
        username: LSuser.name
      }
    }

    log(`Logged in as ${initialState.user.details.name} (ID: ${initialState.user.details.uid})`);
    log('')
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
