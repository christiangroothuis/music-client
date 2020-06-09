import { GET_HOME, GET_ARTISTS, GET_ARTIST } from './constants';

const initialState = {
    home: {
        albums: [],
        artists: [],
    },
    albums: [],
    artists: []
};

const apiReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_HOME:
            return {
                ...state,
                home: {
                    albums: payload.albums,
                    artists: payload.artists,
                }
            };
        case GET_ARTISTS:
            return {
                ...state,
                artists: payload,
            };
        case GET_ARTIST:
            return {
                ...state,
                artists: {
                   ...state.artistData,
                   [payload._id]: payload,
                }
            };
        default:
            return state
    };
}

export default apiReducer;
