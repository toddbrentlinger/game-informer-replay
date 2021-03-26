import React, { useState, useEffect, useReducer, useMemo } from 'react';
import './ReplayCollection.css';
import PageNumbers from './PageNumbers.js';
import ReplayEpisodeComponent from './ReplayEpisodeComponent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import ReplayEpisode from '../classes/ReplayEpisode.js';
import { addCommasToNumber, shuffleArray } from '../utilities';
import FilterSearch from './FilterSearch.js';

// const [state, dispatch] = useReducer(reducer, initialState)
const initialState = {
    'selectedEpisodes': ReplayEpisode.collection,
    'sort': {
        'isAscending': false,
        'type': 'airdate',
    },
    'filter': {
        'search': "",
        'season': new Set(),
        'year': new Set(),
        'segment': new Set(),
        'giCrew': new Set(),
    },
};

function reducer(prevState, action) {
    switch (action.type) {
        case 'sortByType': // action.value = 'none', 'airdate', 'number', etc.
            let newState = {
                ...prevState,
                'sort': { ...prevState.sort, 'type': action.value },
            };
            if (action.value !== 'none') {
                let newSelectedEpisodes = prevState.selectedEpisodes.slice();
                sortByTypeNew(action.value, newSelectedEpisodes, prevState.sort.isAscending);
                newState['selectedEpisodes'] = newSelectedEpisodes;
            }
            return newState;
        case 'sortByDirection': // action.value = {Boolean}
            if (prevState.sort.isAscending === action.value)
                return prevState;
            return {
                ...prevState,
                'selectedEpisodes': prevState.selectedEpisodes.slice().reverse(),
                'sort': {...prevState.sort, 'isAscending': action.value},
            };
        case 'search': // action.value = {String} search terms
        case 'filter': // action.value = {event.target} name, value, isChecked
            let newFilterState = { ...prevState.filter };
            if (typeof action.value === 'string') {
                newFilterState.search = action.value;
            } else { // Else action.value instanceof EventTarget
                // Add/Remove action.value
                const name = action.value.name; // filter object key
                const value = action.value.value; // value to add/remove to set
                const isChecked = action.value.checked; // bool to add/remove value from set
                // If value needs to be added AND NOT already in Set
                if (isChecked && !prevState.filter[name].has(value)) {
                    let newSet = new Set(prevState.filter[name]);
                    newFilterState[name] = newSet.add(value);
                }
                // Else If value needs to be removed AND is in Set
                else if (!isChecked && prevState.filter[name].has(value)) {
                    let newSet = new Set(prevState.filter[name]);
                    newSet.delete(value);
                    newFilterState[name] = newSet;
                }
                // Else filter state does NOT change
                else {
                    return { ...prevState };
                }
            }
            // Get copy all episodes
            let filteredEpisodes = ReplayEpisode.collection.slice();
            // Sort episodes
            sortByTypeNew(prevState.sort.type, filteredEpisodes, prevState.sort.isAscending);
            // Filter episodes based on new filter state
            filteredEpisodes = filterReplayEpisodesNew(filteredEpisodes, newFilterState);
            return {
                ...prevState,
                'selectedEpisodes': filteredEpisodes,
                'filter': newFilterState,
            };
        case 'reset':
            return initialState;
        case 'shuffle':
            let shuffledEpisodes = prevState.selectedEpisodes.slice();
            shuffleArray(shuffledEpisodes);
            return {
                ...prevState,
                'selectedEpisodes': shuffledEpisodes,
                'sort': { ...prevState.sort, 'type': 'none', },
            };
        default:
            return prevState;
    }
}

/**
 * Sorts array of ReplayEpisode objects by type in ascending/descending order.
 * @param {String} type
 * @param {ReplayEpisode[]} episodeArr
 * @param {Boolean} isAscending
 */
function sortByTypeNew(type, episodeArr, isAscending = true) {
    // Sort by type in ascending order
    switch (type) {
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

    // Reverse if isAscendng is false
    if (!isAscending)
        episodeArr.reverse();
}

/**
 * 
 * @param {ReplayEpisode[]} replayEpisodesArr
 * @param {Object} filterObj
 * @param {String} filterObj.search
 * @param {Set} filterObj.season
 * @param {Set} filterObj.year
 * @param {Set} filterObj.segment
 * @param {Set} filterObj.giCrew
 */
function filterReplayEpisodesNew(replayEpisodesArr, filterObj) {
    // Return if filterObj is empty
    if (isFilterEmpty(filterObj)) return replayEpisodesArr;

    return replayEpisodesArr.filter(episode => {
        // Search
        if (filterObj.search && !episode.containsSearchTerm(filterObj.search))
            return false;
        // Season
        if (filterObj.season.size && !filterObj.season.has(episode.getReplaySeason()[0].toString()))
            return false;
        // Year
        if (filterObj.year.size && !filterObj.year.has(episode.airdate.getFullYear().toString()))
            return false;
        // Segment
        if (filterObj.segment.size
            && !Array.from(filterObj.segment.values())
                .some(segment => episode.containsSegment(segment)))
            return false;
        // GI Crew
        if (filterObj.giCrew.size
            && !Array.from(filterObj.giCrew.values())
                .some(name => episode.containsCrew(name)))
            return false;

        // If reach here, return true to include in filter
        return true;
    });
}

function isFilterEmpty(filter) {
    return Object.values(filter).every(value => {
        if (!value)
            return true;
        if (typeof value === 'string')
            return !value.length;
        if (value instanceof Set)
            return !value.size;
    });
}

function ReplayCollection() {
    // States

    //const [selectedEpisodes, setSelectedEpisodes] = useState(ReplayEpisode.collection);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    /*
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
    */
    // Reducer

    const [state, dispatch] = useReducer(reducer, initialState);

    // Effects
    /*
    // TEMP
    useEffect(() => {
        console.log('State has changed:');
        console.log(state);
    }, [state]);
    /*
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
        //setSort({ 'isAscending': false, 'type': 'airdate', });
        dispatch({'type': 'reset'});
        setCurrPage(1);
        document.getElementById('filterForm').reset();
        document.querySelector('#search-container > input').value = "";
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
        dispatch({ 'type': 'filter', 'value': e.target, });
        return;

        const name = e.target.name; // filter object key
        const value = e.target.value; // value to add/remove to set
        const isChecked = e.target.checked; // bool to add/remove value from set
        console.log(`Name: ${name}\nValue: ${value}\nChecked: ${isChecked}`);
        setFilter(prevState => {
            console.log('filter prev: ', prevState[name]);
            if (isChecked && !prevState[name].has(value)) {
                let newSet = new Set(prevState[name])
                console.log('filter new: ', newSet.add(value));
                return { ...prevState, [name]: newSet.add(value) };
            }
            if (!isChecked && prevState[name].has(value)) {
                let newSet = new Set(prevState[name]);
                newSet.delete(value);
                console.log('filter new: ', newSet);
                return { ...prevState, [name]: newSet };
            }
            return prevState;
        });
    }

    function handleFilterFormReset() {
        console.log('handleFilterFormReset() starts');
        setFilter({
            'search': null,
            'season': new Set(),
            'year': new Set(),
            'segment': new Set(),
            'giCrew': new Set(),
        });
    }

    function handleSearch(searchTerm) {
        setFilter(prevState => {
            return { ...prevState, 'search': searchTerm };
        });
    }

    function filterReplayEpisodes(replayEpisodesArr) {
        return replayEpisodesArr.filter(episode => {
            // Search
            if (filter.search && !episode.containsSearchTerm(filter.search))
                return false;
            // Season
            if (filter.season.size && !filter.season.has(episode.getReplaySeason()[0].toString()))
                return false;
            // Year
            if (filter.year.size && !filter.year.has(episode.airdate.getFullYear().toString()))
                return false;
            // Segment
            if (filter.segment.size
                && !Array.from(filter.segment.values())
                    .some(segment => episode.containsSegment(segment)))
                return false;
            // GI Crew
            if (filter.giCrew.size
                && !Array.from(filter.giCrew.values())
                    .some(name => episode.containsCrew(name)))
                return false;

            // If reach here, return true to include in filter
            return true;
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
    */

    function createDisplayedEpisodesComponents() {
        //console.log(`createDisplayedEpisodesComponents() has started\nstate.selectedEpisodes.length: ${state.selectedEpisodes.length}`);
        if (!state.selectedEpisodes.length) return;

        const start = (currPage - 1) * resultsPerPage;
        const end = Math.min(start + resultsPerPage, state.selectedEpisodes.length);

        return state.selectedEpisodes.slice(start, end)
            .map((episode, index) => <ReplayEpisodeComponent key={index} replayEpisode={episode} cuePlaylist={cuePlaylist} />);
    }

    function getSelectedVideoIDArray() {
        let selectedVideoIDArray = [];
        state.selectedEpisodes.forEach(episode => {
            if (episode.youtubeVideoID)
                selectedVideoIDArray.push(episode.youtubeVideoID);
        });
        return selectedVideoIDArray;
    }

    function cuePlaylist(videoID) {
        if (!window.youtubePlayer) {
            console.error('No reference to video player');
            return;
        }

        const selectedVideoIdArray = getSelectedVideoIDArray();
        // If NO videoID parameter, cue playlist of first 200 selected episodes
        if (!videoID) {
            if (selectedVideoIdArray.length) {
                window.youtubePlayer.cuePlaylist(selectedVideoIdArray.slice(0, 200));
            } else { // Else no selected episodes, cue Replay highlights video
                window.youtubePlayer.cueVideoById('0ZtEkX8m6yg');
            }
        }
        // Else cue playlist starting with videoID parameter
        else {
            const episodeIndex = selectedVideoIdArray.indexOf(videoID);
            // Check for errors
            if (episodeIndex === -1) {
                console.error(`Requested video ID "${videoID}" is NOT in selected episodes array`);
                return;
            }

            let playlistStartIndex;
            // If more than 200 episodes in selected video array
            if (selectedVideoIdArray.length > 200) {
                // If episodeIndex is within first 200 on selected video array
                if (episodeIndex < 200)
                    playlistStartIndex = 0;
                // Else If episodeIndex is within last 200 (more than 200 total videos)
                // 350 total(0-349) -- 350-200=150 -- 150-349(200 total)
                else if (episodeIndex >= selectedVideoIdArray.length - 200)
                    playlistStartIndex = selectedVideoIdArray.length - 200;
                // Else (episodeIndex is larger than 200, and more than 400 total videos)
                else
                    playlistStartIndex = 200 * Math.floor(episodeIndex / 200);
                // Cue playlist using playlistStartIndex
                window.youtubePlayer.cuePlaylist(selectedVideoIdArray.slice(
                    playlistStartIndex,
                    playlistStartIndex + 200
                ), episodeIndex - playlistStartIndex);
            } else { // Else 200 or less episodes in selected episodes
                window.youtubePlayer.cuePlaylist(selectedVideoIdArray, episodeIndex);
            }
        }
    }

    // Memo

    const handleDisplayedVideosMessage = useMemo(() => {
        const start = (currPage - 1) * resultsPerPage;
        const end = Math.min(start + resultsPerPage, state.selectedEpisodes.length);

        return `Showing ${start + 1} - ${end} of ${state.selectedEpisodes.length} Replay episodes`;
    }, [currPage, resultsPerPage, state.selectedEpisodes.length]);

    // TODO: Make static function of ReplayEpisode
    const createTotalTimeMessage = useMemo(() => {
        const totalTimeSeconds = ReplayEpisode.totalTimeSeconds;
        const days = Math.floor(totalTimeSeconds / 86400);
        const hours = Math.floor((totalTimeSeconds - days * 86400) / 3600);
        const minutes = Math.floor((totalTimeSeconds - days * 86400 - hours * 3600) / 60);
        const seconds = totalTimeSeconds - (days * 86400) - (hours * 3600) - (minutes * 60);
        return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds! (Total seconds: ${addCommasToNumber(totalTimeSeconds)})`;
    }, []);

    return (
        <div className="row">
            <nav id="sidenav" className="column left">
                <FilterSearch
                    onChange={(e) => dispatch({ 'type': 'filter', 'value': e.target, })} // handleFilterFormChange
                    onReset={() => dispatch({ 'type': 'reset', })} // handleFilterFormReset
                    onSearch={(searchTerms) => dispatch({ 'type': 'search', 'value': searchTerms, })} // handleSearch
                    filterObj={state.filter}
                />
            </nav>
            <main>
                <div id="misc-buttons-container">
                    <button
                        className="custom-button"
                        type="button"
                        id="button-shuffle"
                        onClick={() => dispatch({ 'type': 'shuffle', })} // shuffleSelectedEpisodes
                    >
                        <FontAwesomeIcon icon={faRandom} aria-hidden="true" />
                        SHUFFLE
                    </button>
                    <button
                        className="custom-button"
                        type="button"
                        id="button-reset-list"
                        onClick={() => dispatch({ 'type': 'reset', })} // resetSelectedEpisodes
                    >
                        <FontAwesomeIcon icon={faSyncAlt} aria-hidden="true" />
                        RESET LIST
                    </button>
                </div>
                <PageNumbers
                    currPage={currPage}
                    resultsPerPage={resultsPerPage}
                    setCurrPage={setCurrPage}
                    maxResults={state.selectedEpisodes.length}
                />
                <div id="sort-main">
                    <div id="number-displayed-container">
                        {handleDisplayedVideosMessage}
                    </div>
                    <div id="sort-container">
                        <label htmlFor="sort-type-select">
                            Sort:
                            <select
                                name="sort-type"
                                id="sort-type-select"
                                value={state.sort.type} // sort.type
                                onChange={(e) => {
                                    dispatch({ 'type': 'sortByType', 'value': e.target.value, });
                                    //setSort({ ...sort, 'type': e.target.value});
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
                                value={state.sort.isAscending ? "ascending" : "descending"} // sort.isAscending ? "ascending" : "descending"
                                onChange={(e) => {
                                    dispatch({ 'type': 'sortByDirection', 'value': (e.target.value === "ascending") });
                                    //setSort({ ...sort, 'isAscending': e.target.value === "ascending"});
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
                                onChange={(e) => setResultsPerPage(parseInt(e.target.value, 10))}
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
                    maxResults={state.selectedEpisodes.length}
                    scrollToTop={true}
                />
            </main>
            <div id="stats">
                <h2>Stats:</h2>
                <div id="stats-total-time">
                    <b>Total time of all Replay episodes: </b>
                    {createTotalTimeMessage}
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
        </div>
    );
}

export default ReplayCollection;