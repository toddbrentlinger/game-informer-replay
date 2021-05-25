
const initialState = {
    'selectedChannel': {
        'replay': true,
        'superReplay': false,
        'testChamber': false,
    },
    'replay': {
        'selectedEpisodes': ReplayEpisode.collection,
        'sort': {
            'isAscending': false,
            'type': 'airdate',
        },
        'filter': {
            'search': "",
            'season': new Set(),
            'year': new Set(),
            'segment': new Set(),
            'giCrew': new Set(),
        },
    },
    'isLoading': true,
};

function gameInformerDataReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default gameInformerDataReducer;