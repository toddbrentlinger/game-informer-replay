import React from 'react';
import './ReplayEpisodeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import Thumbnail from './Thumbnail.js';
import GameInformerArticle from './GameInformerArticle.js';
//import playButtonImg from '../images/play-button-icon-gi-256.png';
import { listArrayAsString, addCommasToNumber } from '../utilities.js';
import ReplayEpisode from '../classes/ReplayEpisode.js';

function ReplayEpisodeComponent(props) {
    function playVideo() {
        if (!window.youtubePlayer) return;

        window.youtubePlayer.cueVideoById(props.replayEpisode.youtubeVideoID);
        document.getElementById('video-player-container')
            .scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * @returns {String[]}
     * */
    function createMainSegmentGameList() {
        const gamesArr = props.replayEpisode.mainSegmentGames
            .map(game => game.title);
        return listArrayAsString(gamesArr);
    }

    /**
     * 
     * @param {String} title
     * @param {String} className
     * @param {String} segment
     * @param {String[]} content
     * @returns {React.Component}
     */
    function createSegmentComponent(title, className, segment, content) {
        if (!content) return;

        return (
            <div className={className}>
                <b>{`${title}: `}</b>
                {
                    ReplayEpisode.getSegmentTitle(segment)
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
     * @returns {React.Component[]}
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

    /**
     * 
     * @param {String} headline
     * @returns {React.Component}
     */
    function createListOfLinks(headline, linksArr, urlPrepend) {
        if (!linksArr.length) return null;

        const linksNodeArr = linksArr.map(
            (link, index) => {
                return (
                    <li key={index}>
                        <i>
                            <a
                                href={urlPrepend ? urlPrepend + link.href : link.href}
                                target="_blank"
                                rel="noopener"
                            >{link.title}</a>
                        </i>
                        {ReplayEpisode.getLinkSource(link.href)}
                    </li>
                );
            }
        );

        return (
            <div>
                <h4>{headline}</h4>
                <ul>{linksNodeArr}</ul>
            </div>
        );
    }

    /**
     * 
     * @param {String} heading
     * @param {Object[]} content
     * @returns {React.Component}
     */
    function createSectionFromHeading(heading, content) {
        switch (heading) {
            case 'see_also':
                return createListOfLinks("see also", content, "https://replay.fandom.com")
            case 'gallery':
                return (
                    <div>
                        <h4>gallery</h4>
                        <div className="gallery-container">
                            {
                                content.map((image, index) => (
                                    <div className="gallery-item" key={index}>
                                        <figure>
                                            <figcaption>{image.caption}</figcaption>
                                            <a
                                                href={image.link}
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                <img
                                                    src={image.src}
                                                    width={image.width}
                                                    height={image.height}
                                                    title={image.title}
                                                />
                                            </a>
                                        </figure>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        <h4>{heading.replace(/_/g, " ")}</h4>
                        {createDetailsComponent(content)}
                    </div>
                );
        }
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
                        <div className="click-to-play" title="" onClick={playVideo}>
                            <Thumbnail
                                className="episodeImage"
                                thumbnails={props.replayEpisode.thumbnails}
                                alt={`YouTube thumbnail for episode "${props.replayEpisode.title}"`}
                            />
                            <time className="episodeLength" dateTime="">{props.replayEpisode.videoLength}</time>
                            <div className="playOverlay">
                                <FontAwesomeIcon icon={faPlayCircle} style={ {width: "100%"} } />
                            </div>
                        </div>
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
                {
                    props.replayEpisode.otherHeadings
                        ? (Object.entries(props.replayEpisode.otherHeadings)
                            .map(entry => createSectionFromHeading(entry[0], entry[1]))
                        )
                        : null
                }
                {createListOfLinks("external links", props.replayEpisode.externalLinks)}
            </div>
        </section>
    );
}

export default ReplayEpisodeComponent;