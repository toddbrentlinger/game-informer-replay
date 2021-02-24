"use strict";

export const replayEpisodeCollection = {

};

// -----------------------------
// ---------- Methods ----------
// -----------------------------

replayEpisodeCollection.init = function () {
    const data = this.loadJSON();
    console.log(data.length);
};

replayEpisodeCollection.loadJSON = async function () {
    let data;
    await fetch("%PUBLIC_URL%/data/gameInformerReplayFandomWikiData.json",
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => {
        data = response.json()
    });
    return data;
};