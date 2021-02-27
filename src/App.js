import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import ToggleSwitch from './components/ToggleSwitch.js';
import FooterCustom from './components/FooterCustom.js';

const initialState = {
    'display': { 'replay': false, 'superReplay': false },
    'data': { 'replay': [], 'superReplay': [] }
};

function reducer(state, action) {
    switch (action) {
        case 'replay':
            break;
        case 'superReplay':
            break;
        default:
            return state;
    }
}

function App(props) {
    const [displayedEpisodes, setDisplayedEpisodes] = useState(null);

    useEffect(() => {
        props.replayEpisodeCollection.init();
    }, []);

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
