import React, { useState, useEffect } from 'react';
import './ReplayCollection.css';
import PageNumbers from './PageNumbers.js';
import ReplayEpisodeComponent from './ReplayEpisodeComponent.js';
import ReplayEpisode from '../classes/ReplayEpisode.js';
import { addCommasToNumber } from '../utilities';

function ReplayCollection() {
    const [selectedEpisodes, setSelectedEpisodes] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [isAscending, setIsAscending] = useState(false);
    const [sortType, setSortType] = useState('airdate');
    const [sort, setSort] = useState({
        'isAscending': false, 'type': 'number',
    });

    useEffect(() => {
        console.log("selectedEpisodes is changed");
        console.log(`type: ${sortType}\ndirection: ${isAscending ? "ascending" : "descending"}`);
        let newSelectedEpisodes = ReplayEpisode.collection.slice();
        sortByType(newSelectedEpisodes);
        setSelectedEpisodes(newSelectedEpisodes);
    }, [isAscending, sortType]);

    function sortByType(episodeArr) {
        switch (sortType) {
            case 'none': break;
            case 'video-length':
                episodeArr.sort((first, second) => first.videoLengthInSeconds - second.videoLengthInSeconds);
                break;
            case 'number':
                episodeArr.sort((first, second) => first.number - second.number);
                break;
            case 'views':
                break;
            case 'likes':
                break;
            case 'like-ratio':
                break;
            case 'dislikes':
                break;
            case 'airdate':
            default:
                episodeArr.sort((first, second) => first.airdate - second.airdate);
        }

        if (!isAscending)
            episodeArr.reverse();
    }

    function createDisplayedEpisodesComponents() {
        if (!selectedEpisodes.length) return;

        const start = (currPage - 1) * resultsPerPage;
        const end = Math.min(start + resultsPerPage, selectedEpisodes.length);
        let episodesArr = [];
        for (let i = start; i < end; i++) {
            episodesArr.push(
                <ReplayEpisodeComponent
                    key={i}
                    replayEpisode={selectedEpisodes[i]}
                />
            );
        }
        return episodesArr;

        //return selectedEpisodes.slice(start, end)
        //    .map((episode, index) => <ReplayEpisodeComponent key={index} replayEpisode={episode}/>);
    }

    function handleDisplayedVideosMessage() {
        const start = (currPage - 1) * resultsPerPage;
        const end = Math.min(start + resultsPerPage, ReplayEpisode.collection.length);

        return `Showing ${start + 1} - ${end} of ${ReplayEpisode.collection.length} Replay episodes`;
    }

    function createTotalTimeMessage() {
        const totalTimeSeconds = ReplayEpisode.totalTimeSeconds;
        const days = Math.floor(totalTimeSeconds / 86400);
        const hours = Math.floor((totalTimeSeconds - days * 86400) / 3600);
        const minutes = Math.floor((totalTimeSeconds - days * 86400 - hours * 3600) / 60);
        const seconds = totalTimeSeconds - (days * 86400) - (hours * 3600) - (minutes * 60);
        return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds! (Total seconds: ${addCommasToNumber(totalTimeSeconds)})`;
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
                    <label htmlFor="sort-type-select">
                        Sort:
                        <select
                            name="sort-type"
                            id="sort-type-select"
                            value={sortType}
                            onChange={(e) => { setSortType(e.target.value) }}
                        >
                            <option value="none">-- Sort By --</option>
                            <option value="airdate">Air Date</option>
                            <option value="number">Ep. Number</option>
                            <option value="views">Views</option>
                            <option value="likes">Likes</option>
                            <option value="like-ratio">Like Ratio</option>
                            <option value="video-length">Video Length</option>
                        </select>
                    </label>

                    <label htmlFor="sort-direction-select">
                        Direction:
                        <select
                            name="sort-direction"
                            id="sort-direction-select"
                            value={isAscending ? "ascending" : "descending"}
                            onChange={(e) => { setIsAscending(e.target.value === "ascending"); }}
                        >
                            <option value="descending">Descending</option>
                            <option value="ascending">Ascending</option>
                        </select>
                    </label>
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
            <div id="stats">
                <h2>Stats:</h2>
                <div id="stats-total-time">
                    <b>Total time of all Replay episodes: </b>
                    {createTotalTimeMessage()}
                </div>
                <div id="stats-total-views">
                    <b>Total views of all Replay episodes: </b>
                    {addCommasToNumber(ReplayEpisode.totalViews)}
                </div>
                <div id="stats-total-likes">
                    <b>Total likes of all Replay episodes: </b>
                    {`${addCommasToNumber(ReplayEpisode.totalLikes)} (${(ReplayEpisode.totalLikes * 100 / (ReplayEpisode.totalLikes + ReplayEpisode.totalDislikes)).toFixed(1)}%)`}
                </div>
                <div id="stats-games-played">
                    <b>Games played: </b>
                    {`${addCommasToNumber(ReplayEpisode.gamesPlayed.size + 50)} (estimate)`}
                </div>
            </div>
        </main>
    );
}

export default ReplayCollection;