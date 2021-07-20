import React from 'react';
import './IsLoading.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SpinningReplayLogo from './SpinningReplayLogo.js';

function IsLoading() {
    //const spinnerIcon = (
    //    <div className='icon'>
    //        <FontAwesomeIcon icon={faSpinner} />
    //    </div>
    //);

    return (
        <div className="loading-container">
            <SpinningReplayLogo />
            <h2>Loading...</h2>
        </div>
    );
}

export default IsLoading;