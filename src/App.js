import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { FormsContextProvider } from './context/FormsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FormsContextProvider>
        <Dashboard />
      </FormsContextProvider>
    </ThemeProvider>
  );
}

export default App;
