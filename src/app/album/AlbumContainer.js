import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playAlbum, pause } from '../../audio/actions';

import AlbumComponent from './AlbumComponent';

AlbumComponent.propTypes = {
    audioState: PropTypes.object.isRequired,
    playAlbum: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    audioState: state.audioState
})

const dispatchToProps = (dispatch) => ({
    playAlbum: ({ album, index }) => dispatch(playAlbum({ album, index })),
    pause: () => dispatch(pause())
})

export default connect(mapStateToProps, dispatchToProps)(AlbumComponent);
