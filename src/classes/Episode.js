"use strict";

import { getVideoLengthInSeconds } from '../utilities.js';

export default class Episode {
    // ---------------------------------
    // ---------- Constructor ----------
    // ---------------------------------

    constructor(episodeData) {
        this.title = episodeData.episodeTitle;
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

    getDateString() {
        let months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        return months[this.airdate.getMonth()] + ' ' + this.airdate.getDate() +
            ', ' + this.airdate.getFullYear();
    }

    /**
     * Returns true if episode contains GI crew name, else false.
     * @param {String} name
     * @returns {Boolean}
     */
    containsCrew(name) {
        // Host
        if (this.host && this.host.includes(name))
            return true;
        // Featuring
        if (this.featuring && this.featuring.includes(name))
            return true;
        // If reach here, return false
        return false;
    }

    /**
     * Recursive function to search each property of class instance.
     * @param {String} searchTerm
     * @param {any} obj
     * @returns {Boolean}
     */
    containsSearchTerm(searchTerm, obj = this) {
        // String
        if (typeof obj === 'string') {
            return obj.toLowerCase().includes(searchTerm.toLowerCase());
        }
        // Number
        if (typeof obj === 'number') {
            return obj.toString().includes(searchTerm.toLowerCase());
        }
        // Array
        if (Array.isArray(obj)) {
            return obj.some(element => this.containsSearchTerm(searchTerm, element));
        }
        // Object
        if (typeof obj === 'object' && obj !== null) {
            return Array.from(Object.values(obj))
                .some(value => this.containsSearchTerm(searchTerm, value));
        }
        // Other
        return false;
    }
}