import React from 'react';
import { ThemeProvider } from './src/store/ThemeContext';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
