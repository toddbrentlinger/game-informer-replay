"use strict";

import { isEmptyObject, getVideoLengthInSeconds } from '../utilities.js';

export default class ReplayEpisode {
    // ---------------------------------
    // ---------- Constructor ----------
    // ---------------------------------
    constructor(episodeData) {
        this.number = episodeData.episodeNumber;
        this.title = episodeData.episodeTitle;
        this.mainSegmentGames = episodeData.mainSegmentGamesAdv;
        this.videoLength = episodeData.details.runtime;
        this.thumbnails = episodeData.youtube.thumbnails;

        // Air Date
        const dateStr = episodeData.details.airdate;
        // If air date does not exist, assign null
        if (!dateStr || dateStr.length == 0)
            this.airdate = null;
        else { // Else air date does exist
            if (dateStr.includes('/') || dateStr.includes(','))
                this.airdate = new Date(dateStr);
            else
                this.airdate = dateStr;
        }

        // Host(s)
        if (episodeData.details.host)
            this.host = episodeData.details.host;

        // Featuring
        if (episodeData.details.featuring)
            this.featuring = episodeData.details.featuring;

        // Description
        if (Array.isArray(episodeData.details.description) &&
            episodeData.details.description.length) {
            this.description = episodeData.details.description;
        }

        // Middle Segment (only 3rd season)
        if (episodeData.middleSegment &&
            episodeData.middleSegment.replace(/-/gi, '').length) {
            this.middleSegment = episodeData.middleSegment;
        }

        // Middle Segment Content (only 3rd season)
        if (episodeData.middleSegmentContent &&
            episodeData.middleSegmentContent.replace(/-/gi, '').length) {
            this.middleSegmentContent = episodeData.middleSegmentContent;
        }

        // Second Segment
        if (episodeData.secondSegment &&
            episodeData.secondSegment.replace(/-/gi, '').length) {
            this.secondSegment = episodeData.secondSegment;
        }

        // Second Segment Games
        if (episodeData.secondSegmentGames &&
            Array.isArray(episodeData.secondSegmentGames) &&
            episodeData.secondSegmentGames.length &&
            episodeData.secondSegmentGames[0].replace(/-/gi, '').length) {
            this.secondSegmentGames = episodeData.secondSegmentGames;
        }

        // YouTube views/likes
        if (episodeData.youtube) {
            // Views
            if (episodeData.youtube.views)
                this.views = parseInt(episodeData.youtube.views, 10);
            // Likes
            if (episodeData.youtube.likes)
                this.likes = parseInt(episodeData.youtube.likes, 10);
            // Dislikes
            if (episodeData.youtube.dislikes)
                this.dislikes = parseInt(episodeData.youtube.dislikes, 10);
        }

        // YouTube video ID
        let tempVideoID = ''; // Default empty string if NO video ID is found
        if (episodeData.details && episodeData.details.external_links) {
            const youtubeLink = episodeData.details.external_links
                .find(element => element.href.includes('youtube'));
            if (youtubeLink)
                tempVideoID = youtubeLink.href.split('=')[1].slice(0, 11);
        }
        if (tempVideoID) this.youtubeVideoID = tempVideoID;

        // Game Informer article
        if (episodeData.article)
            this.giArticle = episodeData.article;

        // External Links
        this.externalLinks = [];
        if (episodeData.details.external_links)
            this.externalLinks = episodeData.details.external_links;
        // Add Fandom link as first element of external links list
        if (episodeData.fandomWikiURL) {
            this.externalLinks.unshift(
                { href: `https://replay.fandom.com${episodeData.fandomWikiURL}`, title: this.title }
            );
        }

        // Other Headings
        const propsToIgnore = [
            'description', 'external_links', 'image', 'system', 'gamedate', 'airdate', 'runtime', 'host', 'featuring'
        ];
        let tempHeadingsObj = {};
        for (const [key, value] of Object.entries(episodeData.details)) {
            // Check if ignore prop
            if (propsToIgnore.includes(key)) continue;
            // If property is array and array is empty, continue
            if (Array.isArray(value) && !value.length) continue;
            // Add to tempHeadingsObj
            tempHeadingsObj[key] = value;
        }
        // If tempHeadingsObj is NOT empty, assign to this.otherHeadingsObj
        if (!isEmptyObject(tempHeadingsObj))
            this.otherHeadings = tempHeadingsObj;

        // Update static properties
        ReplayEpisode.collection.push(this);
        ReplayEpisode.totalTimeSeconds += this.videoLengthInSeconds;
        if (this.views) ReplayEpisode.totalViews += this.views;
        if (this.likes) ReplayEpisode.totalLikes += this.likes;
        if (this.dislikes) ReplayEpisode.totalDislikes += this.dislikes;
        ReplayEpisode.checkGamesInEpisode(this);

    }

    // -----------------------------
    // ---------- Getters ----------
    // -----------------------------

    // TODO: Perhaps make a property of class instance
    get videoLengthInSeconds() {
        return getVideoLengthInSeconds(this.videoLength);
    }

    get airDateAsDateTimeAttribute() {
        return `${this.airdate.getFullYear()}-${this.airdate.getMonth() + 1}-${this.airdate.getDate()}`;
    }

    get likeRatio() {
        if (this.likes && this.dislikes)
            return ((this.likes * 100) / (this.likes + this.dislikes)).toFixed(1);
    }

    // ------------------------------------
    // ---------- Public Methods ----------
    // ------------------------------------

    createEpisodeNumberStr() {
        const temp = this.getReplaySeason();
        if (temp[0]) // If season is 1 or higher
            return `S${temp[0]}:E${temp[1]} (#${this.number})`;
        else // Else season is 0 (unofficial episode)
            return `Unofficial #${Math.floor(this.number * 100)}`;
    }

    /**
     * Get replay season and season episode number
     * @returns {[Number, Number]}
     * @todo Make getter or static method of ReplayEpisode?
     */
    getReplaySeason() {
        //Constant array to hold episode numbers that each season begins with.
        // Episode numbers less than 1 are special unoffical episodes
        const replaySeasonStartEpisodes = [1, 107, 268, 385, 443, 499]; // [S1, S2, S3, S4, S5, S6]

        // Season
        let season = 0;
        for (let index = 0; index < replaySeasonStartEpisodes.length; index++) {
            if (this.number < replaySeasonStartEpisodes[index]) {
                season = index;
                break;
            }
            // If reached end of loop, assign last season
            if (index == replaySeasonStartEpisodes.length - 1) {
                season = replaySeasonStartEpisodes.length;
            }
        }

        // Season Episode
        let seasonEpisode = ((season > 1) ?
            this.number - replaySeasonStartEpisodes[season - 1] + 1 :
            this.number);

        // Return both season and seasonEpisode number
        return [season, seasonEpisode];
    }

    getDateString() {
        let months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        return months[this.airdate.getMonth()] + ' ' + this.airdate.getDate() +
            ', ' + this.airdate.getFullYear();
    }

    /**
     * 
     * @param {String} segment
     * @returns {String}
     * @todo Perhaps make static method?
     */
    getSegmentTitle(segment) {
        // If segment is empty, there is no segment, return empty string
        if (segment && typeof segment === 'string' && segment.length === 0)
            return null;

        switch (segment) {
            case 'RR': return 'Replay Roulette';
            case 'SRS': return 'Super Replay Showdown';
            case 'YDIW': return "You're Doing It Wrong";
            case 'ST': return 'Stress Test';
            case 'RP': return 'RePorted';
            case 'DP': return 'Developer Pick';
            case '2037': return 'Replay 2037';
            case 'HF': return 'Horror Fest';
            case 'RRL': return 'Replay Real Life';
            default: return segment;
            // Other Segments: GI Versus, Developer Spotlight, 
            // Reevesplay, Moments
        }
    }

    // ---------------------------------------
    // ---------- Static Properties ----------
    // ---------------------------------------

    static collection = [];
    static totalTimeSeconds = 0;
    static totalViews = 0;
    static totalLikes = 0;
    static totalDislikes = 0;
    static gamesPlayed = new Map();

    // ------------------------------------
    // ---------- Static Methods ----------
    // ------------------------------------

    /**
     * 
     * @param {String} url
     * @todo Move to public method since it does NOT use static properties
     */
    static getLinkSource(url) {
        const linkSourceOptions = {
            'gameinformer': 'Game Informer',
            'youtube': 'YouTube',
            'fandom': 'Fandom',
            'wikipedia': 'Wikipedia',
            'gamespot': 'GameSpot',
            'steampowered': 'Steam',
        };

        const linkSourceKey = Object.keys(linkSourceOptions)
            .find(key => url.includes(key));

        return linkSourceKey
            ? ` on ${linkSourceOptions[linkSourceKey]}`
            : null;
    }

    /**
     * 
     * @param {String} gameTitle
     */
    static addGameToGamesPlayed(gameTitle) {
        if (this.gamesPlayed.has(gameTitle)) {
            this.gamesPlayed.get(gameTitle).count++;
        } else {
            this.gamesPlayed.set(gameTitle, { 'count': 1 });
        }
    }

    static checkGamesInEpisode(replayEpisode) {
        // Main Segment
        if (replayEpisode.mainSegmentGames) {
            for (const game of replayEpisode.mainSegmentGames)
                this.addGameToGamesPlayed(game.title);
        }
        // Second Segment
        if (replayEpisode.secondSegmentGames) {
            for (const gameTitle of replayEpisode.secondSegmentGames)
                this.addGameToGamesPlayed(gameTitle);
        }
        // Middle Segment
        if (replayEpisode.middleSegmentContent) {
            const ignoreMiddleSegments = ['A Poor Retelling of Gaming History', 'Reflections', 'Embarassing Moments'];
            const ignoreMiddleSegmentsContentEndingWith = [' Ad', ' Reel', ' Skit', ' Buttz', ' Pamphlet'];
            // Check segment type
            if (replayEpisode.middleSegment
                && ignoreMiddleSegments.includes(replayEpisode.middleSegment))
                return;
            // Check content ending
            if (ignoreMiddleSegmentsContentEndingWith
                .some(str => replayEpisode.middleSegmentContent.endsWith(str)))
                return;
            // If reach this point, check game title
            this.addGameToGamesPlayed(replayEpisode.middleSegmentContent);
        }
    }
}