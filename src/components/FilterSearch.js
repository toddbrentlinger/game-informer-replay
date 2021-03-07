import React, { useRef } from 'react';
import './FilterSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';

function FilterSearch(props) {
    const filterFormRef = useRef(null);

    /**
     * 
     * @param {String} name
     * @param {String} value
     * @param {String} label
     */
    function createFieldsetLabel(name, value, label) {
        if (label === undefined)
            label = value;

        return (
            <label>
                {label}
                <input type="checkbox" name={name} value={value} />
                <span className="checkmark"></span>
            </label>
        );
    }

    function createSingleSeasonFieldListElement(str, value) {
        if (value === undefined)
            value = parseInt(str, 10);
        return (
            <li key={value}>
                <label>
                    {str}
                    <input type="checkbox" name="season" value={value} />
                    <span className="checkmark"></span>
                </label>
            </li>
        );
    }

    function createSeasonFieldListElements() {
        let fieldListElements = [];
        for (let i = 1; i <= 6; i++) {
            fieldListElements.push(createSingleSeasonFieldListElement(i))
        }
        fieldListElements.push(createSingleSeasonFieldListElement("Special", 0));

        return (
            <ul>{fieldListElements}</ul>
        );
    }

    return (
        <div id="search-filter-container">
                <div id="search-container">
                <input type="text" placeholder="Search..." required />
                <button className="custom-button" type="button" aria-label="search">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <button
                id="filter-display-toggle-button"
                className="custom-button collapsible"
                onClick={
                    () => {
                        filterFormRef.current.style.maxHeight = 
                            filterFormRef.current.style.maxHeight
                                ? null
                                : filterFormRef.current.scrollHeight + 12 + "px";
                    }
                }
            >
                <FontAwesomeIcon icon={faSlidersH} aria-hidden="true" />
                FILTER
            </button>
            <form
                id="filterForm"
                ref={filterFormRef}
                onChange={() => { }}
                onReset={() => { }}
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
                    <ul></ul>
                </fieldset>

                <fieldset form="filterForm" id="segment-field">
                    <legend>Segment: </legend>
                    <ul></ul>
                </fieldset>

                <fieldset form="filterForm" id="gi-crew-field">
                    <legend>GI Crew: </legend>
                    <ul></ul>
                </fieldset>
            </form>
        </div>
    );
}

export default FilterSearch;