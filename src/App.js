import React from 'react';
import './App.css';
import { FormControl, MenuItem, Select  } from '@material-ui/core';

function App() {
  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl classname="app__dropdown">
          <Select
            variant="outlined"
            value="abc"
          >
            <MenuItem>Worldwide</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Select>
        </FormControl>

        {/* Header */}
        {/* Title + dropdown */}
        {/* Info boxes */}
        {/* Maps */}
        {/* Graph */}
        {/* Tables */}
      </div>  
    </div>
  );
}

export default App;
