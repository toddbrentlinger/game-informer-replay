import React, { useState, useEffect } from 'react';
import './PageNumbers.css';
import { debounce } from '../utilities.js';

function PageNumbers(props) {
    // States

    const [numDisplayedButtons, setNumDisplayedButtons] = useState(getNumDisplayedButtons());

    // Constants

    const lastPage = Math.ceil(props.maxResults / props.resultsPerPage);
    const middlePage = Math.ceil(numDisplayedButtons / 2);

    // Effects

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            const newValue = getNumDisplayedButtons();
            if (newValue !== numDisplayedButtons)
                setNumDisplayedButtons(newValue);
        }, 1000);

        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

    // Checks if currPage beyond last page
    useEffect(() => {
        if (props.currPage > lastPage)
            props.setCurrPage(lastPage);
    });

    // Functions

    /** Returns number of numbered buttons to display depending on window width. */
    function getNumDisplayedButtons() {
        if (window.matchMedia("(max-width: 480px)").matches)
            return 3;
        else if (window.matchMedia("(max-width: 750px)").matches)
            return 5;
        else
            return 7;
    }

    function goToPage(num) {
        if (props.scrollToTop)
            document.getElementById('top-page').scrollIntoView({ behavior: "smooth" });
        props.setCurrPage(num);
    }

    function goPrevPage() {
        // Return if currPage is 1
        if (props.currPage === 1)
            return;

        goToPage(props.currPage - 1);
    }

    function goNextPage() {
        // Return if currPage is last page
        if (props.currPage === lastPage)
            return;

        goToPage(props.currPage + 1);
    }

    function createNumberedPageButtons() {
        let numberedPageButtons = [];
        let start, end;
        // If lastPage is more than numDisplayedButtons
        if (lastPage > numDisplayedButtons) {
            if (props.currPage > lastPage - middlePage) {
                // Show last numDisplayedButtons
                start = lastPage - numDisplayedButtons + 1;
                end = lastPage;
            } else if (props.currPage > middlePage) {
                // Show buttons with current page in middle
                start = props.currPage - middlePage + 1;
                end = props.currPage + middlePage - 1;
            } else {
                // Show first numDisplayedButtons
                start = 1;
                end = numDisplayedButtons;
            }
        } else { // Else lastPage is less than or equal to numDisplayedButtons
            // Add buttons ranging from 1 to lastPage
            start = 1;
            end = lastPage;
        }

        for (let i = start; i <= end; i++) {
            numberedPageButtons.push(
                <button
                    key={i}
                    className={"custom-button" + (i === props.currPage ? " active" : "")}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </button>
            );
        }
        return numberedPageButtons;
    }

    const pageButtonContainerTemplate = (
        <div className="page-button-container">
            <button
                className="custom-button"
                onClick={goPrevPage}
                // Disable 'PREV' if current page is equal to 1
                disabled={props.currPage === 1}
                type="button"
                value="prev"
            >
                PREV
            </button>
            <button
                className="custom-button"
                onClick={() => goToPage(1)}
                // Disable 'FIRST' if last page is less than or equal to numDisplayedButtons
                // OR current page is near beginning of list
                disabled={
                    lastPage <= numDisplayedButtons ||
                    props.currPage <= middlePage
                }
                type="button"
                value="first"
            >
                FIRST
            </button>
            <div className="page-number-container">
                {createNumberedPageButtons()}
            </div>
            <button
                className="custom-button"
                onClick={() => goToPage(lastPage)}
                // Disable 'LAST' if last page is less than or equal to numDisplayedButtons
                // OR current page is near end of list
                disabled={
                    lastPage <= numDisplayedButtons ||
                    props.currPage >= lastPage - middlePage + 1
                }
                type="button"
                value="last"
            >
                LAST
            </button>
            <button
                className="custom-button"
                onClick={goNextPage}
                // Disable 'NEXT' if current page is equal to last page
                disabled={props.currPage === lastPage}
                type="button"
                value="next"
            >
                NEXT
            </button>
        </div>
    );

    return (lastPage > 1 ? pageButtonContainerTemplate : null);
}

export default PageNumbers;