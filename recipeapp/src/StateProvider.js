import React from 'react';
import { useContext, useReducer, useEffect } from 'react';


export const StateContext = React.createContext();

export const StateProvider = ({ reducer, initialState, children }) => (

    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>)

export const useStateValue = () => useContext(StateContext);