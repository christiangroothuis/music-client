import { connect } from 'react-redux';
import { playAlbum, pause } from '../../audio/actions';

import AlbumComponent from './AlbumComponent';

const mapStateToProps = (state) => ({
    isPlaying: state.audioState.isPlaying,
    playlist: state.audioState.playlist,
    currentIndex: state.audioState.currentIndex,
})

const dispatchToProps = (dispatch) => ({
    playAlbum: ({ album, index }) => dispatch(playAlbum({ album, index })),
    pause: () => dispatch(pause())
})

export default connect(mapStateToProps, dispatchToProps)(AlbumComponent);
