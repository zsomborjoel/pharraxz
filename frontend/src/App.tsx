import React, { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/header/Header';

const App: FC = () => {
  return (
    <Box>
        <Header />
        
    </Box>
  );
}

export default App;
