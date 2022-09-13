import React from 'react';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Column from './components/Column';
import Tasks from './components/Tasks';
import styled from 'styled-components';

function App() {
  return (
    <Div className="App">
      <ResponsiveAppBar />
      <Column/>
      {/* <Tasks/> */}
    </Div>
  );
}

export default App;

const Div = styled.div`
  background-color: #E8ECF1;
`;