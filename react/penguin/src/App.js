import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Clock } from './components/Clock';

function App() {
  function logMe() {
    console.log(`button clicked`);
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(`linked clicked`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={logMe}>Log Me</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/"
          onClick={handleClick}
          rel="noopener noreferrer"
        >
          Click Me
        </a>
        <Clock />
      </header>
    </div>
  );
}

export default App;
