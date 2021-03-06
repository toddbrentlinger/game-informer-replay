import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import ToggleSwitch from './components/ToggleSwitch.js';
import FooterCustom from './components/FooterCustom.js';
import ReplayEpisode from './classes/ReplayEpisode.js';
import ReplayCollection from './components/ReplayCollection.js';
import IsLoading from './components/IsLoading.js';
import JumpToTop from './components/JumpToTop.js';

/*
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
*/

function App() {
    const [selectedChannel, setSelectedChannel] = useState({
        'replay': true,
        'superReplay': false,
        'testChamber': false,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("data/gameInformerReplayFandomWikiData.json",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then((response) => response.json()
        ).then((data) => {
            data.forEach(episodeData => new ReplayEpisode(episodeData));
            setIsLoading(false);
        });
    }, []);
    
    return (
        <div className="App">
            <header><h1>Game Informer</h1></header>
            <nav id="topnav">
                <div id="category-select-btn-container">
                    <button
                        className={selectedChannel.replay ? "active" : null}
                    >Replay</button>
                    <button>Super Replay</button>
                    <button>Test Chamber</button>
                </div>
                <ToggleSwitch />
            </nav>
            <div id="top-page"></div>
            {isLoading ? <IsLoading /> : <ReplayCollection />}
            <JumpToTop />
            <FooterCustom />
        </div>
    );
}

export default App;
