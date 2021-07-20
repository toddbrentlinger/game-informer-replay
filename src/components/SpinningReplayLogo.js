import React from 'react';
import './SpinningReplayLogo.css';
import ReplayLogoCircleArrow from '../images/replay-logo-circle-arrow.png';
import ReplayLogoText from '../images/replay-logo-text.png';

function SpinningReplayLogo() {
    return (
        <div className="spinning-replay-logo-container">
            <div className="spinning-replay-logo">
                <img className="replay-logo-circle-arrow" src={ReplayLogoCircleArrow} />
                <img className="replay-logo-text" src={ReplayLogoText} />
            </div>
        </div>
    );
}

export default SpinningReplayLogo;