import React, { useEffect, useRef } from 'react';

function YouTubePlayer(props) {
    const videoPlayerRef = useRef(null);
    /*
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // This function creates an <iframe> (and YouTube player)
        // after the API code downloads.
        window.onYouTubePlayerAPIReady = function () {
            replayEpisodeCollection.videoPlayer = new YT.Player('youtubePlayerPlaceholder', {
                height: 360,
                width: 640,
                //videoId: '0ZtEkX8m6yg', // default video: Replay Highlights
                playerVars: {
                    playlist: [replayEpisodeCollection.selectedVideoIdArray.slice(0, 200) || '0ZtEkX8m6yg'],
                    iv_load_policy: 3, // video annotations (default: 1)
                    modestbranding: 1,
                    enablejsapi: 1,
                    loop: 0,
                    origin: 'https://toddbrentlinger.github.io'
                },
                events: {
                    onReady: replayEpisodeCollection.onPlayerReady.bind(replayEpisodeCollection),
                    //onStateChange: replayEpisodeCollection.onPlayerStateChange.bind(replayEpisodeCollection),
                    onError: replayEpisodeCollection.onPlayerError.bind(replayEpisodeCollection)
                }
            });

            //console.log('window.onYouTubePlayerAPIReady() has finished');
        };
    }, []);
    */

    return (
        <div style={{"display": "block"}} id="videoPlayer">
            <div className="iframeWrapper">
                <div ref={videoPlayerRef} id="youtubePlayerPlaceholder"></div>
            </div>
        </div>
    );
}

export default YouTubePlayer;