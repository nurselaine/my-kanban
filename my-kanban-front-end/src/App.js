import React from 'react';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Column from './components/Column';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Column/>
      {/* <Tasks/> */}
    </div>
  );
}

export default App;
