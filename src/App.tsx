import React from 'react';
import './App.css';
import Autocomplete from './Autocomplete/Autocomplete';
import { getEntries } from './api/client';

function App() {
  return (
    <div className="App">
      <Autocomplete getEntries={getEntries}/>
    </div>
  );
}

export default App;
