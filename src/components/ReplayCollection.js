import React, { useState, useEffect, useRef } from 'react';
import './ReplayCollection.css';
import PageNumbers from './PageNumbers.js';
import ReplayEpisodeComponent from './ReplayEpisodeComponent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import ReplayEpisode from '../classes/ReplayEpisode.js';
import { addCommasToNumber, shuffleArray } from '../utilities';
import FilterSearch from './FilterSearch.js';

function ReplayCollection() {
    // States

    const [selectedEpisodes, setSelectedEpisodes] = useState(ReplayEpisode.collection);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    //const [isAscending, setIsAscending] = useState(false);
    //const [sortType, setSortType] = useState('airdate');
    const [sort, setSort] = useState({
        'isAscending': false, 'type': 'airdate',
    });
    const [filter, setFilter] = useState({
        'search': null,
        'season': new Set(),
        'year': new Set(),
        'segment': new Set(),
        'giCrew': new Set(),
    });

    // Effects

    useEffect(() => {
        if (sort.type === 'none') return;

        let newSelectedEpisodes = selectedEpisodes.slice();
        sortByType(newSelectedEpisodes);
        setSelectedEpisodes(newSelectedEpisodes);
        console.log("selectedEpisodes is changed after sort");
    }, [sort]);

    useEffect(() => {
        //console.log('Filter has changed');
        //console.log(filter);

        let newSelectedEpisodes = ReplayEpisode.collection.slice();
        sortByType(newSelectedEpisodes);
        if (isFilterEmpty())
            setSelectedEpisodes(newSelectedEpisodes);
        else
            setSelectedEpisodes(filterReplayEpisodes(newSelectedEpisodes));
        console.log("selectedEpisodes is changed after filter");
    }, [filter]);

    // Functions

    function shuffleSelectedEpisodes() {
        let newSelectedEpisodes = selectedEpisodes.slice();
        shuffleArray(newSelectedEpisodes);
        setSort({ ...sort, 'type': 'none' });
        setSelectedEpisodes(newSelectedEpisodes);
    }

    function resetSelectedEpisodes() {
        setSort({ 'isAscending': false, 'type': 'airdate', });
        handleFilterFormReset();
    }

    function sortByType(episodeArr) {
        // Sort by type in ascending order
        switch (sort.type) {
            case 'none': break;
            case 'video-length':
                episodeArr.sort((first, second) => first.videoLengthInSeconds - second.videoLengthInSeconds);
                break;
            case 'number':
                episodeArr.sort((first, second) => first.number - second.number);
                break;
            case 'views':
                episodeArr.sort((first, second) => ReplayEpisode.compareReplayEpisodesByProperty(first, second, "views"));
                break;
            case 'likes':
                episodeArr.sort((first, second) => ReplayEpisode.compareReplayEpisodesByProperty(first, second, "likes"));
                break;
            case 'like-ratio':
                episodeArr.sort((first, second) => ReplayEpisode.compareReplayEpisodesByProperty(first, second, "likeRatio"));
                break;
            case 'dislikes':
                episodeArr.sort((first, second) => ReplayEpisode.compareReplayEpisodesByProperty(first, second, "dislikes"));
                break;
            case 'airdate':
            default:
                episodeArr.sort((first, second) => first.airdate - second.airdate);
        }

        // Reverse if isAscending is false
        if (!sort.isAscending)
            episodeArr.reverse();
    }

    function handleFilterFormChange(e) {
        const name = e.target.name; // filter object key
        const value = e.target.value; // value to add/remove to set
        const isChecked = e.target.checked; // bool to add/remove value from set
        //console.log(`Name: ${name}\nValue: ${value}\nChecked: ${isChecked}`);
        setFilter(prevState => {
            if (isChecked && !prevState[name].has(value)) {
                let newSet = new Set(prevState[name])
                return { ...prevState, [name]: newSet.add(value) };
            }
            if (!isChecked && prevState[name].has(value)) {
                let newSet = new Set(prevState[name]);
                newSet.delete(value);
                return { ...prevState, [name]: newSet };
            }
            return prevState;
        });
    }

    function handleFilterFormReset() {
        setFilter({
            'search': null,
            'season': new Set(),
            'year': new Set(),
            'segment': new Set(),
            'giCrew': new Set(),
        });
    }

    function filterReplayEpisodes(replayEpisodesArr) {
        return replayEpisodesArr.filter(episode => {
            // Search
            // Season
            if (filter.season.has(episode.getReplaySeason()[0].toString()))
                return true;
            // Year
            if (filter.year.has(episode.airdate.getFullYear().toString()))
                return true;
            // Segment
            for (const segment of filter.segment.values()) {
                if (episode.containsSegment(segment))
                    return true;
            }
            // GI Crew
            for (const name of filter.giCrew.values()) {
                if (episode.containsCrew(name))
                    return true;
            }
        });
    }

    function isFilterEmpty() {
        return Object.values(filter).every(value => {
            if (!value)
                return true;
            if (typeof value === 'string')
                return !value.length;
            if (value instanceof Set)
                return !value.size;
        });
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
        const end = Math.min(start + resultsPerPage, selectedEpisodes.length);

        return `Showing ${start + 1} - ${end} of ${selectedEpisodes.length} Replay episodes`;
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
        <main>
            <FilterSearch
                onChange={handleFilterFormChange}
                onReset={handleFilterFormReset}
            />
            <div id="misc-buttons-container">
                <button
                    className="custom-button"
                    type="button"
                    id="button-shuffle"
                    onClick={shuffleSelectedEpisodes}
                >
                    <FontAwesomeIcon icon={faRandom} aria-hidden="true" />
                    SHUFFLE
                </button>
                <button
                    className="custom-button"
                    type="button"
                    id="button-reset-list"
                    onClick={resetSelectedEpisodes}
                >
                    <FontAwesomeIcon icon={faSyncAlt} aria-hidden="true" />
                    RESET LIST
                </button>
            </div>
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={selectedEpisodes.length}
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
                            value={sort.type}
                            onChange={(e) => {
                                setSort({ ...sort, 'type': e.target.value});
                            }}
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
                            value={sort.isAscending ? "ascending" : "descending"}
                            onChange={(e) => {
                                setSort({ ...sort, 'isAscending': e.target.value === "ascending"});
                                
                            }}
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
                maxResults={selectedEpisodes.length}
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