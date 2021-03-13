import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import DarkModeToggleSwitch from './components/DarkModeToggleSwitch.js';
import FooterCustom from './components/FooterCustom.js';
import ReplayEpisode from './classes/ReplayEpisode.js';
import ReplayCollection from './components/ReplayCollection.js';
import IsLoading from './components/IsLoading.js';
import JumpToTop from './components/JumpToTop.js';
import YouTubePlayer from './components/YouTubePlayer.js';

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

    function getSelectedChannelTitle() {
        if (selectedChannel.replay)
            return "Game Informer Replay";
        if (selectedChannel.superReplay)
            return "Game Informer Super Replay";
        if (selectedChannel.testChamber)
            return "Game Informer Test Chamber";
        return;
    }

    function createImageHeader() {
        let srcSet, src;
        if (selectedChannel.replay) {
            srcSet = "./images/replay-logo-alpha(2)_300.png 300w, ./images/replay-logo-alpha(2).png 610w";
            src = "./images/replay-logo-alpha(2).png";
        } else if (selectedChannel.superReplay) {

        } else if (selectedChannel.testChamber) {

        } else {
            return;
        }

        return (
            <img
                srcSet={srcSet}
                sizes="(max-width: 900px) 300px, 610px"
                src={src}
                alt={getSelectedChannelTitle() + " Logo"}
                width="610"
                height="214"
            />
        );
    }
    
    return (
        <div className="App">
            <nav id="topnav">
                <div id="category-select-btn-container">
                    <button
                        className={selectedChannel.replay ? "active" : null}
                    >Replay</button>
                    <button>Super Replay</button>
                    <button>Test Chamber</button>
                </div>
                <DarkModeToggleSwitch />
            </nav>
            <header>
                <h1>{getSelectedChannelTitle()}</h1>
            </header>
            {createImageHeader()}
            <div id="video-player-container">
                <YouTubePlayer />
            </div>
            <div id="top-page"></div>
            {isLoading ? <IsLoading /> : <ReplayCollection />}
            <JumpToTop />
            <FooterCustom />
        </div>
    );
}

export default App;
