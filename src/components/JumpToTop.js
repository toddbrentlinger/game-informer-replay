import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import './JumpToTop.css';

function JumpToTop() {
    const containerRef = useRef(null);

    useEffect(() => {
        const mainElement = document.getElementById('top-page');
        window.addEventListener("scroll", () => {
            if (mainElement.getBoundingClientRect().top < 0)
                containerRef.current.classList.remove('hide');
            else
                containerRef.current.classList.add('hide');
            //containerRef.current.style.display = (mainElement.getBoundingClientRect().top < 0)
            //    ? "block"
            //    : "none";
        });
    }, []);

    return (
        <div id="jump-top-page-container"
            title="Jump To Top"
            //style={{ "display": "none" }}
            className="hide"
            onClick={() => document.getElementById('top-page').scrollIntoView({ behavior: "smooth" })}
            ref={containerRef}
        >
            <div>
                <FontAwesomeIcon
                    icon={faChevronCircleUp}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}

export default JumpToTop;