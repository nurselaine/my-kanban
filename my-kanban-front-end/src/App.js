import React from 'react';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ResponsiveFooter from './components/ResponserFooter';
import Column from './components/Column';
import styled from 'styled-components';

function App() {
  return (
    <Div className='App'>
        <ResponsiveAppBar />
      <Div className='container'>
        <Column />
      </Div>
      <span>
        <ResponsiveFooter />
      </span>
    </Div>

  );
}

export default App;

const Div = styled.div`
  background-color: #E8ECF1;
`;