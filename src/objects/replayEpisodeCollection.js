"use strict";

import ReplayEpisode from '../classes/ReplayEpisode.js';

export const replayEpisodeCollection = {
    replayEpisodeObjectArray: [], // Stores all ReplayEpisode objects
    selectedEpisodes: [], // Stores references to ReplayEpisode objects in replayEpisodeObjectArray according to filter/sort properties
    totalTimeSeconds: 0,
};

// -----------------------------
// ---------- Methods ----------
// -----------------------------

replayEpisodeCollection.init = function () {
    const data = this.loadJSON();
};

replayEpisodeCollection.loadJSON = async function () {
    await fetch("data/gameInformerReplayFandomWikiData.json",
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => response.json()
    ).then((data) => {
        this.createReplayEpisodeArray(data);
    });
};

replayEpisodeCollection.createReplayEpisodeArray = function (data) {
    //this.jsonData = data;
    this.replayEpisodeObjectArray = data.map(
        (episodeData) => new ReplayEpisode(episodeData)
    );
}