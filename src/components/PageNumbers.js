import React, { useState, useEffect } from 'react';
import './PageNumbers.css';
import { debounce } from '../utilities.js';

function PageNumbers(props) {
    const [numDisplayedButtons, setNumDisplayedButtons] = useState(getNumDisplayedButtons());

    /** Returns number of numbered buttons to display depending on window width. */
    function getNumDisplayedButtons() {
        if (window.matchMedia("(max-width: 480px)").matches)
            return 3;
        else if (window.matchMedia("(max-width: 750px)").matches)
            return 5;
        else
            return 7;
    }

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
        if (props.currPage === getLastPageNum())
            return;

        goToPage(props.currPage + 1);
    }

    function getLastPageNum() {
        return Math.ceil(props.maxResults / props.resultsPerPage);
    }

    function getMiddleButton() {
        return Math.ceil(numDisplayedButtons / 2);
    }

    function createNumberedPageButtons() {
        let numberedPageButtons = [];
        const totalPages = getLastPageNum();
        const middleButtonNum = getMiddleButton();
        let start, end;
        // If totalPages is more than numDisplayedButtons
        if (totalPages > numDisplayedButtons) {
            if (props.currPage > totalPages - middleButtonNum) {
                // Show last numDisplayedButtons
                start = totalPages - numDisplayedButtons + 1;
                end = totalPages;
            } else if (props.currPage > middleButtonNum) {
                // Show buttons with current page in middle
                start = props.currPage - middleButtonNum + 1;
                end = props.currPage + middleButtonNum - 1;
            } else {
                // Show first numDisplayedButtons
                start = 1;
                end = numDisplayedButtons;
            }
        } else { // Else totalPages is less than or equal to numDisplayedButtons
            // Add buttons ranging from 1 to totalPages
            start = 1;
            end = totalPages;
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
                    getLastPageNum() <= numDisplayedButtons ||
                    props.currPage <= getMiddleButton()
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
                onClick={() => goToPage(getLastPageNum())}
                // Disable 'LAST' if last page is less than or equal to numDisplayedButtons
                // OR current page is near end of list
                disabled={
                    getLastPageNum() <= numDisplayedButtons ||
                    props.currPage >= getLastPageNum() - getMiddleButton() + 1
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
                disabled={props.currPage === getLastPageNum()}
                type="button"
                value="next"
            >
                NEXT
            </button>
        </div>
    );

    return (props.maxResults ? pageButtonContainerTemplate : null);
}

export default PageNumbers;