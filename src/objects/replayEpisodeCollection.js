"use strict";

import ReplayEpisode from '../classes/ReplayEpisode.js';

export const replayEpisodeCollection = {
    replayEpisodeObjectArray: [], // Stores all ReplayEpisode objects
    selectedEpisodes: [], // Stores references to ReplayEpisode objects in replayEpisodeObjectArray according to filter/sort properties
    totalTimeSeconds: 0, //TODO: Could make static property of ReplayEpisode class
};

// -----------------------------
// ---------- Methods ----------
// -----------------------------

replayEpisodeCollection.init = async function () {
    const data = await this.loadJSON();
    console.log(`outside async has completed with data.length: ${data.length}`);
    this.createReplayEpisodeArray(data);
};

replayEpisodeCollection.loadJSON = async function () {
    let episodeData;
    await fetch("data/gameInformerReplayFandomWikiData.json",
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => response.json()
    ).then((data) => {
        console.log(`inside async has completed with data.length: ${data.length}`);
        episodeData = data;
    });
    return episodeData;
};

replayEpisodeCollection.createReplayEpisodeArray = function (data) {
    this.replayEpisodeObjectArray = data.map(
        (episodeData) => new ReplayEpisode(episodeData)
    );
}