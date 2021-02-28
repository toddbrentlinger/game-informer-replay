import React from 'react';
import './ReplayEpisodeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Thumbnail from './Thumbnail.js';
import playButtonImg from '../images/play-button-icon-gi-256.png';

function ReplayEpisode(props) {

    return (
        <section className="episode">
            <div className="episodeMain">
                <div className="episodeHeader">
                    <h3 className="episodeTitle">{props.replayEpisode.title}</h3>
                    <div className="episodeNumber">{props.replayEpisode.createEpisodeNumberStr()}</div>
                </div>
                <div className="thumbnail-container">
                    <div className="episodeThumbnail">
                        <a title="">
                            <Thumbnail
                                className="episodeImage"
                                thumbnails={props.replayEpisode.thumbnails}
                                alt={`YouTube thumbnail for episode "${props.replayEpisode.title}"`}
                            />
                            <time className="episodeLength" dateTime="">{props.replayEpisode.videoLength}</time>
                            <div className="playOverlay">
                                <img alt="" width="256" height="256" src={playButtonImg} />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="episodeDetails">
                    <div className="episodeAirDate"><b>Air Date: </b><time dateTime=""></time></div>
                    <div className="views-likes-container">
                        <div className="views" title="Views"><b><FontAwesomeIcon icon={faEye} /></b></div>
                        <div className="likes" title="Likes (Like Ratio)"><b><FontAwesomeIcon icon={faThumbsUp} /></b></div>
                    </div>
                    <div className="gi-crew">
                        <div className="episodeHosts"><b>Host: </b></div>
                        <div className="episodeFeaturing"><b>Featuring: </b></div>
                    </div>
                    <div className="segments">
                        <div className="mainSegment"><b>Main Segment: </b></div>
                        <div className="middleSegment"><b>Middle Segment: </b></div>
                        <div className="secondSegment"><b>Second Segment: </b></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="episodeMoreInfo">
            </div>
        </section>
    );
}

export default ReplayEpisode;