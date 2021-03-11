import React from 'react';
import YouTube from 'react-youtube';
import './YouTubePlayer.css';

function YouTubePlayer(props) {
    const opts = {
        height: 360,
        width: 640,
        //videoId: '0ZtEkX8m6yg', // default video: Replay Highlights
        playerVars: {
            playlist: ['0ZtEkX8m6yg'],
            iv_load_policy: 3, // video annotations (default: 1)
            modestbranding: 1,
            enablejsapi: 1,
            loop: 0,
            origin: 'https://toddbrentlinger.github.io'
        },
    };

    return (
        <div style={{ "display": "block" }} id="videoPlayer">
            <YouTube
                className="iframeWrapper"
                opts={opts}
            />
        </div>
    );
}

export default YouTubePlayer;