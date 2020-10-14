import React, { createContext, useContext, useReducer } from 'react'
export const StateContext = createContext()
export const GlobalProvider = ({ globalReducer, globalState, children }) => (
  <StateContext.Provider value={useReducer(globalReducer, globalState)}>
    {children}
  </StateContext.Provider>
)
export const useStateValue = () => useContext(StateContext)