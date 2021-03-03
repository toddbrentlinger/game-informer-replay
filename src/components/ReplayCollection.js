import React, { useState } from 'react';
import './ReplayCollection.css';
import PageNumbers from './PageNumbers.js';
import ReplayEpisodeComponent from './ReplayEpisodeComponent.js';
import ReplayEpisode from '../classes/ReplayEpisode.js';

function ReplayCollection() {
    const [selectedEpisodes, setSelectedEpisodes] = useState(ReplayEpisode.collection);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    function createDisplayedEpisodesComponents() {
        if (!selectedEpisodes.length) return;

        let episodesArr = [];
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

    function handleDisplayedVideosMessage() {
        const start = (currPage - 1) * resultsPerPage;
        const end = Math.min(start + resultsPerPage, ReplayEpisode.collection.length);

        return `Showing ${start + 1} - ${end} of ${ReplayEpisode.collection.length} Replay episodes`;
    }

    return (
        <main id="top-page">
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={ReplayEpisode.collection.length}
            />
            <div id="sort-main">
                <div id="number-displayed-container">
                    {handleDisplayedVideosMessage()}
                </div>
                <div id="sort-container">
                    <label htmlFor="max-displayed-select">
                        Per Page:
                        <select
                            name="max-displayed"
                            id="max-displayed-select"
                            value={resultsPerPage}
                            onChange={(e) => { setResultsPerPage(parseInt(e.target.value, 10)); }}
                        >
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </label>
                </div>
            </div>
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
}

export default ReplayCollection;