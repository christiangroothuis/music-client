import { GET_HOME, GET_ARTISTS, GET_ARTIST } from './constants';

import { API_URL } from '../constants';

export const getHome = () => dispatch => {
    return fetch(`${API_URL}/home`)
        .then(res => res.json())
        .then(homeData => dispatch({ type: GET_HOME, payload: homeData }))
        .catch(err => console.log(err))
}

export const getArtists = () => dispatch => {
    return fetch(`${API_URL}/artists`)
        .then(res => res.json())
        .then(data => dispatch({ type: GET_ARTISTS, payload: data.artists }))
        .catch(err => console.log(err))
}

export const getArtist = (artistId) => dispatch => {
    return fetch(`${API_URL}/artists/${artistId}`)
        .then(res => res.json())
        // .then(resp => console.log(artistId))
        .then(data => dispatch({ type: GET_ARTIST, payload: data }))
        .catch(err => console.log(err))
}
