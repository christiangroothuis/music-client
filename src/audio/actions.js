import { PLAY_SONG } from './constants';

import { API_URL } from '../constants';

let loaded = false;

const load = () => {
   // Load audio to avoid permission issues
   const audio = document.getElementById('audio');
   if (!loaded && audio) {
      audio.load();
      loaded = true
   }
}


export const playAlbum = ({ album, index = 0 }) => dispatch => {
   load()
   return fetch(`${API_URL}/albums/${album}`)
      .then((res) => res.json())
      .then(data => dispatch({
         type: PLAY_SONG, playlist: data.album.tracks.map(song => ({
            ...song,
            img: data.album.img,
            album: data.album._id
         })),
         index,
         parent: {
            name: data.album.name,
            _id: data.album._id,
            artists: data.album.artists,
            img: data.album.img,
            type: data.album.type,
         }
      }))
      .catch((err) => console.log(err));
};

export const playArtist = ({ artist }) => dispatch => {
   return fetch(`${API_URL}/artists/${artist}`)
      .then((res) => res.json())
      .then(data => dispatch({
         type: PLAY_SONG, playlist: [],
         parent: {
            name: data.artist.name,
            _id: data.artist._id,
            img: data.artist.img,
            type: data.artist.type,
         }
      }))
      .catch((err) => console.log(err));
};

export const resume = () => ({ type: 'RESUME' });
export const pause = () => ({ type: 'PAUSE' });
export const nextSong = () => ({ type: 'NEXT_SONG' });
export const prevSong = () => ({ type: 'PREV_SONG' });
export const addToQueue = track => ({ type: 'ADD_TO_QUEUE', track });
export const changeVolume = volume => ({ type: 'CHANGE_VOLUME', volume });
export const updateTime = info => ({ type: 'UPDATE_TIME', info });
export const setFocus = focus => ({ type: 'SET_FOCUS', focus });