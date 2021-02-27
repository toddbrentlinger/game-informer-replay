import React from 'react';
import './ReplayEpisodeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Thumbnail from './Thumbnail.js';

function ReplayEpisode(props) {

    return (
        <section class="episode">
            <div class="episodeMain">
                <div class="episodeHeader">
                    <h3 class="episodeTitle">{props.replayEpisode.title}</h3>
                    <div class="episodeNumber">{props.replayEpisode.createEpisodeNumberStr()}</div>
                </div>
                <div class="thumbnail-container">
                    <div class="episodeThumbnail">
                        <a title="">
                            <Thumbnail
                                className="episodeImage"
                                thumbnails={props.replayEpisode.thumbnails}
                            />
                            <time class="episodeLength" datetime=""></time>
                            <div class="playOverlay">
                                <img alt="" width="256" height="256" src="../images/play-button-icon-gi-256.png" />
                            </div>
                        </a>
                    </div>
                </div>
                <div class="episodeDetails">
                    <div class="episodeAirDate"><b>Air Date: </b><time datetime=""></time></div>
                    <div class="views-likes-container">
                        <div class="views" title="Views"><b><FontAwesomeIcon icon={faEye} /></b></div>
                        <div class="likes" title="Likes (Like Ratio)"><b><FontAwesomeIcon icon={faThumbsUp} /></b></div>
                    </div>
                    <div class="gi-crew">
                        <div class="episodeHosts"><b>Host: </b></div>
                        <div class="episodeFeaturing"><b>Featuring: </b></div>
                    </div>
                    <div class="segments">
                        <div class="mainSegment"><b>Main Segment: </b></div>
                        <div class="middleSegment"><b>Middle Segment: </b></div>
                        <div class="secondSegment"><b>Second Segment: </b></div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="episodeMoreInfo">
            </div>
        </section>
    );
}

export default ReplayEpisode;