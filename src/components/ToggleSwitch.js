import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch(props) {
    return (
        <div className="switch-container">
            <label className="switch">
                <input type="checkbox" id="dark-mode-checkbox" />
                <span className="slider round"></span>
            </label>
            <em htmlFor="dark-mode-checkbox">Dark Mode</em>
        </div>
    );
}

export default ToggleSwitch;