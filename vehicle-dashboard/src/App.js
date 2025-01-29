import React from 'react';
import { Counter } from './features/counter/Counter';
import MyAppBar from './components/AppBar';
import Dashboard from './components/Dashboard';
import { Toolbar } from '@mui/material';


function App() {
  return (
    <div>
      <MyAppBar />
      <Toolbar /> {/* This Toolbar component adds space below the AppBar */}
      <Dashboard />
    </div>
  );
}

export default App;