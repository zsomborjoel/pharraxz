import React, { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';

const App: FC = () => {
  return (
    <Box>
        <Header />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </Box>
  );
}

export default App;
