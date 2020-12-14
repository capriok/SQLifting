import React, { createContext, Reducer, useContext, useReducer } from 'react'

export const StateContext = createContext<GlobalState | any>(undefined)

interface ProviderProps {
  globalState: GlobalState
  globalReducer: Reducer<GlobalState, ReducerAction>
}

export const GlobalProvider: React.FC<ProviderProps> = ({ globalState, globalReducer, children }) => (
  <StateContext.Provider value={useReducer(globalReducer, globalState)}>
    {children}
  </StateContext.Provider>
)
export const useStateValue = () => useContext(StateContext)