import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import ToggleSwitch from './components/ToggleSwitch.js';
import FooterCustom from './components/FooterCustom.js';
//import { replayEpisodeCollection } from './objects/replayEpisodeCollection';
import ReplayEpisode from './classes/ReplayEpisode.js';
import ReplayEpisodeComponent from './components/ReplayEpisodeComponent.js';

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
    const [displayedEpisodes, setDisplayedEpisodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //useEffect(() => {
    //    props.replayEpisodeCollection.init();
    //}, []);

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
            setDisplayedEpisodes(ReplayEpisode.collection);
            setIsLoading(false);
        });
    }, []);

    function createDisplayedEpisodesComponents() {
        if (!displayedEpisodes.length) return;

        let episodesArr = [];
        const start = 302;
        const end = 308;
        for (let i = start; i < end; i++) {
            episodesArr.push(
                <ReplayEpisodeComponent
                    key={i}
                    replayEpisode={displayedEpisodes[i]}
                />
            );
        }
        return episodesArr;
    }

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
            <main>{isLoading ? "Loading..." : createDisplayedEpisodesComponents()}</main>
            <FooterCustom />
        </div>
    );
}

export default App;
