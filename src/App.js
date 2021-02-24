import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ToggleSwitch from './components/ToggleSwitch.js';
import FooterCustom from './components/FooterCustom.js';

function App() {
  return (
      <div className="App">
          <header><h1>Game Informer</h1></header>
          <nav id="topnav">
              <div id="category-select-btn-container">
                  <button>Replay</button>
                  <button>Super Replay</button>
              </div>
              <ToggleSwitch />
          </nav>
          <main>LIST</main>
          <FooterCustom />
      </div>
  );
}

export default App;
