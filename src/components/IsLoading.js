import React from 'react';
import './IsLoading.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function IsLoading() {
    return (
        <div className="loading-container">
            <div className='icon'>
                <FontAwesomeIcon icon={faSpinner} />
            </div>
            <h2>Loading...</h2>
        </div>
    );
}

export default IsLoading;