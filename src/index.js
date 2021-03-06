import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { replayEpisodeCollection } from './objects/replayEpisodeCollection.js';
import ReplayEpisode from './classes/ReplayEpisode.js';

window.ReplayEpisode = ReplayEpisode; // temp for debugging
//window.replayEpisodeCollection = replayEpisodeCollection;
//replayEpisodeCollection.init();

// Global variable for YouTube video player
window.youtubePlayer = null;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
