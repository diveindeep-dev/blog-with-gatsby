import React, { createContext } from 'react';
import GlobalState from './GlobalState';

const defaultState = { mode: 'light' };

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={GlobalState()}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };
