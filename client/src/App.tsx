import React from 'react';
import './App.css';
import { DateForm } from './components/DateForm';
import { Nform } from './components/Nform';



function App() {
  return (
    <div className="wrapper">
      <section className='titlebar'> 
          <h1> NBP API</h1>
      </section>
      <section>
        <div className='forms'>
          <Nform requestType={'average'}/>
          <Nform requestType={'maximum'}/>
          <DateForm />
        </div>
      </section>
    </div>
  );
}

export default App;
