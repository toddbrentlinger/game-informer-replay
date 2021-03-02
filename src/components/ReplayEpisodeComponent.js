import React from 'react';
import './ReplayEpisodeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Thumbnail from './Thumbnail.js';
import GameInformerArticle from './GameInformerArticle.js';
import playButtonImg from '../images/play-button-icon-gi-256.png';
import { listArrayAsString, addCommasToNumber } from '../utilities.js';

function ReplayEpisode(props) {
    function createMainSegmentGameList() {
        const gamesArr = props.replayEpisode.mainSegmentGames
            .map(game => game.title);
        return listArrayAsString(gamesArr);
    }

    function createSegmentComponent(title, className, segment, content) {
        if (!segment) return;

        return (
            <div className={className}>
                <b>{`${title}: `}</b>
                {
                    props.replayEpisode.getSegmentTitle(segment)
                    + (content
                        ? ` - ${listArrayAsString(content)}`
                        : null)
                }
            </div>
        );
    }

    /**
     * 
     * @param {Object[]} contentArr
     */
    function createDetailsComponent(contentArr) {
        if (!contentArr) return;

        return contentArr.map(
            (content, index) => {
                // If content is an array, add ul list of values
                if (Array.isArray(content)) {
                    return (
                        <ul key={index}>
                            { content.map((str, listIndex) => (<li key={listIndex}>{str}</li>)) }
                        </ul>
                    );
                }
                // Else create p element
                else {
                    return <p key={index}>{content}</p>
                }
            }
        );
    }

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
                                <img alt="Play video icon" width="256" height="256" src={playButtonImg} />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="episodeDetails">
                    <div className="episodeAirDate">
                        <b>Air Date: </b>
                        <time
                            dateTime={props.replayEpisode.airDateAsDateTimeAttribute}
                        >
                            {props.replayEpisode.getDateString()}
                        </time>
                    </div>
                    <div className="views-likes-container">
                        <div className="views" title="Views">
                            <b><FontAwesomeIcon icon={faEye} /></b>
                            {props.replayEpisode.views ? addCommasToNumber(props.replayEpisode.views) : null}
                        </div>
                        <div className="likes" title="Likes (Like Ratio)">
                            <b><FontAwesomeIcon icon={faThumbsUp} /></b>
                            {props.replayEpisode.likes ? `${addCommasToNumber(props.replayEpisode.likes)} (${props.replayEpisode.likeRatio})` : null}
                        </div>
                    </div>
                    <div className="gi-crew">
                        <div className="episodeHosts"><b>Host: </b>{listArrayAsString(props.replayEpisode.host)}</div>
                        <div className="episodeFeaturing"><b>Featuring: </b>{listArrayAsString(props.replayEpisode.featuring)}</div>
                    </div>
                    <div className="segments">
                        <div className="mainSegment"><b>Main Segment: </b>{createMainSegmentGameList()}</div>
                        {createSegmentComponent("Middle Segment", "middleSegment", props.replayEpisode.middleSegment, props.replayEpisode.middleSegmentContent)}
                        {createSegmentComponent("Second Segment", "secondSegment", props.replayEpisode.secondSegment, props.replayEpisode.secondSegmentGames)}
                    </div>
                </div>
            </div>
            <hr />
            <div className="episodeMoreInfo">
                <div className="description">
                    {createDetailsComponent(props.replayEpisode.description)}
                </div>
                <GameInformerArticle article={props.replayEpisode.giArticle} />
            </div>
        </section>
    );
}

export default ReplayEpisode;