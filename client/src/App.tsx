import React from 'react';
import './App.css';
import { Nform } from './components/Nform';

function App() {
  return (
    <div className="wrapper">
      <section className='titlebar'> 
          <h1> NBP API</h1>
      </section>
      <section>
        <div className='forms'>
          <Nform/>
        </div>
      </section>
    </div>
  );
}

export default App;
