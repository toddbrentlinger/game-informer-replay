import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import ToggleSwitch from './components/ToggleSwitch.js';
import FooterCustom from './components/FooterCustom.js';
//import { replayEpisodeCollection } from './objects/replayEpisodeCollection';
import ReplayEpisode from './classes/ReplayEpisode.js';
import ReplayEpisodeComponent from './components/ReplayEpisodeComponent.js';
import PageNumbers from './components/PageNumbers.js';

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

function App() {
    const [selectedEpisodes, setSelectedEpisodes] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
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
            setSelectedEpisodes(ReplayEpisode.collection);
            setIsLoading(false);
        });
    }, []);

    function createDisplayedEpisodesComponents() {
        if (!selectedEpisodes.length) return;

        let episodesArr = [];
        //const start = 0; // 302
        //const end = 5; // 308
        const start = (currPage - 1) * resultsPerPage;
        const end = Math.min(start + resultsPerPage, selectedEpisodes.length);
        for (let i = start; i < end; i++) {
            episodesArr.push(
                <ReplayEpisodeComponent
                    key={i}
                    replayEpisode={selectedEpisodes[i]}
                />
            );
        }
        return episodesArr;
    }

    const mainContent = (
        <main id="top-page">
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={ReplayEpisode.collection.length}
            />
            {createDisplayedEpisodesComponents()}
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={ReplayEpisode.collection.length}
                scrollToTop={true}
            />
        </main>
    );

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
            {isLoading ? "Loading..." : mainContent}
            <FooterCustom />
        </div>
    );
}

export default App;
