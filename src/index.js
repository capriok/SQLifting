/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-extend-native: "off"*/
import React from 'react';
import ReactDOM from 'react-dom';
import initialState from './state/context'
import stateReducer from './state/reducer'
import { StateProvider } from "./state/state";
import App from './app';

import './index.scss';
import 'react-tippy/dist/tippy.css'
import 'react-draggable-array/dist/index.css'

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function Index() {
  const log = (message) => console.log(`%c${message}`, 'color: white')

  console.log('%cWelcome to SQLifting', `
    color: white;
    font-family: Verdana;
    font-size: 1.5rem;
    border-bottom: 2px solid lightskyblue;
  `);

  if (process.env.NODE_ENV === 'production') console.log = () => { }
  if (initialState.user.token) {
    if (process.env.NODE_ENV === 'development') {
      log('-------------------------TASKS-------------------------')
      log('- Think about more composition editing features')
      log('     Add deps to entity?')
      log('     Change sets, reps, or weight of composite dep?')
      log('- Authentication should be done smarter')
      log('     JWT for routes involving account specific data')
    }
    log('-------------------------USER-------------------------')
    log(`Logged in as ${initialState.user.details.username.capitalize()} (ID: ${initialState.user.details.uid})`);
    log('-------------------------DATA-------------------------')
  }

  return (
    <>
      <StateProvider initialState={initialState} reducer={stateReducer}>
        <App />
      </StateProvider>
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'))
