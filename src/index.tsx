/*eslint no-unused-vars: "off"*/
/*eslint no-extend-native: "off"*/
import React from 'react';
import ReactDOM from 'react-dom';
import { globalState } from './global/context'
import { globalReducer } from './global/reducer'
import { GlobalProvider } from "./global/state";
import App from './app';

import './index.scss';

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

const Index: React.FC = () => {
  const log = (message: string) => console.log(`%c${message}`, 'color: white')

  console.log('%cWelcome to SQLifting', `
    color: white;
    font-family: Verdana;
    font-size: 1.5rem;
    border-bottom: 2px solid lightskyblue;
  `);

  if (process.env.NODE_ENV === 'production') console.log = () => { }
  if (globalState.user.token) {
    if (process.env.NODE_ENV === 'development') {
      log('-------------------------TASKS-------------------------')
      log('- Think about more composition editing features')
      log('     Add deps to entity?')
      log('     Change sets, reps, or weight of composite dep?')
      log('- Authentication should be done smarter')
      log('     JWT for routes involving account specific data')
    }
    log('-------------------------USER-------------------------')
    log(`Logged in as ${capitalize(globalState.user.details.username)} (ID: ${globalState.user.details.uid})`);
    log('-------------------------DATA-------------------------')
  }

  return (
    <>
      <GlobalProvider globalState={globalState} globalReducer={globalReducer}>
        <App />
      </GlobalProvider>
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'))
