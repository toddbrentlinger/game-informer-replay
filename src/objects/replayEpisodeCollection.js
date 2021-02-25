"use strict";

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
    console.log(`Data outside fetch: ${data.length}`);
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
        console.log(`Data inside fetch: ${data.length}`);
        this.createReplayEpisodeArray(data);
    });
};

replayEpisodeCollection.createReplayEpisodeArray = function (data) {

}