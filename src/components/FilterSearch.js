import React, { useState, useRef, useEffect } from 'react';
import './FilterSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import ReplayEpisode from '../classes/ReplayEpisode';

function FilterSearch(props) {
    // States

    const [searchInput, setSearchInput] = useState("");

    // Refs

    const filterFormRef = useRef(null);

    // Effects

    useEffect(() => {
        if (searchInput !== props.filterObj.search)
            setSearchInput(props.filterObj.search);
    }, [props.filterObj.search]);

    // Functions

    function handleFilterToggle(e) {
        e.target.classList.toggle('active');
        filterFormRef.current.style.maxHeight = (
            filterFormRef.current.style.maxHeight
                ? null
                : filterFormRef.current.scrollHeight + 12 + "px"
        );
    }

    /**
     * 
     * @param {String} name
     * @param {String|Number} value
     * @param {String|Number} label
     * @param {Boolean} isChecked
     * @todo Create separate component with props: name, value, label, isChecked
     */
    function createSingleFieldListElement(name, value, label) {
        if (label === undefined)
            label = value;
        return (
            <li key={value}>
                <label>
                    {label}
                    <input
                        type="checkbox"
                        name={name}
                        value={value}
                        checked={props.filterObj[name].has(value)}
                        onChange={props.onChange}
                    />
                    <span className="checkmark"></span>
                </label>
            </li>
        );
    }

    function createSeasonFieldListElements() {
        let fieldListElements = [];
        for (let i = 1; i <= 6; i++) {
            //isChecked = props.filterProps.season.has(i.toString());
            fieldListElements.push(
                createSingleFieldListElement("season", i.toString())
            );
        }
        fieldListElements.push(createSingleFieldListElement("season", 0, "Special"));

        return (<ul>{fieldListElements}</ul>);
    }

    function createYearFieldListElements() {
        //console.log('createYearFieldList');
        const currentYear = new Date().getFullYear();
        let fieldListElements = [];
        for (let i = 2010; i <= currentYear; i++) {
            fieldListElements.push(createSingleFieldListElement("year", i.toString()));
        }

        return (<ul>{fieldListElements}</ul>);
    }

    function createSegmentFieldListElements() {
        const fieldListElements = ReplayEpisode.getSegmentsForFilterForm()
            .map(
                segment => createSingleFieldListElement("segment", segment.name, `${ReplayEpisode.getSegmentTitle(segment.name)} (${segment.count})`)
            );
        return (<ul>{fieldListElements}</ul>);
    }

    function createGICrewFieldListElements() {
        const fieldListElements = ReplayEpisode.getGICrewForFilterForm()
            .map(
                person => createSingleFieldListElement("giCrew", person.name, `${person.name} (${person.count})`)
            );
        return (<ul>{fieldListElements}</ul>);
    }

    function handleSearchOnKeyUp(e) {
        // No. 13 is 'enter' key
        if (e.keyCode === 13) {
            e.preventDefault(); // Cancel default action, if needed
            props.onSearch(searchInput);
        }
    }

    return (
        <div id="search-filter-container">
            <div id="search-container">
                <input
                    type="search"
                    placeholder="Search..."
                    required
                    value={searchInput}
                    onKeyUp={handleSearchOnKeyUp}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    className="custom-button"
                    type="button"
                    aria-label="search"
                    onClick={() => { props.onSearch(searchInput); }}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <button
                id="filter-display-toggle-button"
                className="custom-button collapsible"
                onClick={(e) => handleFilterToggle(e)}
            >
                <FontAwesomeIcon icon={faSlidersH} aria-hidden="true" />
                FILTER
            </button>
            <form
                id="filterForm"
                ref={filterFormRef}
                onReset={props.onReset}
            >
                <div id="filterSubmitButton">
                    <button
                        type="button"
                        className="custom-button"
                        id="filter-toggle-select-button"
                        onClick={() => filterFormRef.current.reset()}
                    >
                        CLEAR ALL
                    </button>
                </div>

                <fieldset form="filterForm" id="seasonField">
                    <legend>Season: </legend>
                    {createSeasonFieldListElements()}
                </fieldset>

                <fieldset form="filterForm" id="year-field">
                    <legend>Year: </legend>
                    {createYearFieldListElements()}
                </fieldset>

                <fieldset form="filterForm" id="segment-field">
                    <legend>Segment: </legend>
                    {createSegmentFieldListElements()}
                </fieldset>

                <fieldset form="filterForm" id="gi-crew-field">
                    <legend>GI Crew: </legend>
                    {createGICrewFieldListElements()}
                </fieldset>
            </form>
        </div>
    );
}

export default FilterSearch;