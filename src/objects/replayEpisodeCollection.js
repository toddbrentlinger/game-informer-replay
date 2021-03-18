"use strict";

import ReplayEpisode from '../classes/ReplayEpisode.js';

export const replayEpisodeCollection = {
    // Stores references to ReplayEpisode objects in ReplayEpisode.collection according to filter/sort properties
    selectedEpisodes: [],

    sort: {'type': 'airdate', 'isAscending': false},
    filter: {
        'search': null,
        'season': new Set(),
        'year': new Set(),
        'segment': new Set(),
        'giCrew': new Set(),
    },
};

// -----------------------------
// ---------- Methods ----------
// -----------------------------

replayEpisodeCollection.init = async function () {
    const data = await this.loadJSON();
    console.log(`outside async has completed with data.length: ${data.length}`);
};

replayEpisodeCollection.loadJSON = async function () {
    let isFinished = false;
    await fetch("data/gameInformerReplayFandomWikiData.json",
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => response.json()
    ).then((data) => {
        data.forEach(episodeData => new ReplayEpisode(episodeData));
        console.log(`inside async has completed with data.length: ${data.length}`);
        let isFinished = true;
    });
    return isFinished;
};