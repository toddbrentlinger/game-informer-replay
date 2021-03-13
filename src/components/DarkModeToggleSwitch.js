import React, { useEffect } from 'react';
import './DarkModeToggleSwitch.css';
import { useDarkMode } from '../customHooks.js';

function DarkModeToggleSwitch() {
    const [colorMode, setColorMode] = useDarkMode();

    useEffect(() => {

    }, []);

    function handleOnChange() {
        setColorMode(
            prevState => prevState === 'light' ? 'dark' : 'light'
        );
    }

    const darkModeSwitchTemplate = (
        <div className="switch-container">
            <label className="switch">
                <input
                    type="checkbox"
                    id="dark-mode-checkbox"
                    checked={colorMode === 'dark'}
                    onChange={handleOnChange}
                />
                <span className="slider round"></span>
            </label>
            <em htmlFor="dark-mode-checkbox">Dark Mode</em>
        </div>
    );

    return (
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? null
            : darkModeSwitchTemplate
    );
}

export default DarkModeToggleSwitch;