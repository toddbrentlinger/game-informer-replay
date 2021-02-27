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
        this.external_links = [];
        if (episodeData.details.external_links)
            this.external_links = episodeData.details.external_links;
        // Add Fandom link as first element of external links list
        if (episodeData.fandomWikiURL) {
            this.external_links.unshift(
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
        ReplayEpisode.totalTimeSeconds += getVideoLengthInSeconds(this.videoLength);
        if (this.views) ReplayEpisode.totalViews += this.views;
        if (this.likes) ReplayEpisode.totalLikes += this.likes;
        if (this.dislikes) ReplayEpisode.totalDislikes += this.dislikes;

    }

    // -----------------------------
    // ---------- Getters ----------
    // -----------------------------

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

    // ---------------------------------------
    // ---------- Static Properties ----------
    // ---------------------------------------

    static collection = [];
    static totalTimeSeconds = 0;
    static totalViews = 0;
    static totalLikes = 0;
    static totalDislikes = 0;

    // ------------------------------------
    // ---------- Static Methods ----------
    // ------------------------------------
}