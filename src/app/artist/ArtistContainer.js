import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getArtist } from '../../api/actions';

import ArtistComponent from './ArtistComponent';
import { playArtist } from '../../audio/actions';

ArtistComponent.propTypes = {
    // artists: PropTypes.isRequired,
    playArtist: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    artists: state.apiState.artists
})

const dispatchToProps = (dispatch) => ({
    // getArtist: (artist) => dispatch(getArtist(artist))
    playArtist: (artist) => dispatch(playArtist(artist))
})

export default connect(mapStateToProps, dispatchToProps)(ArtistComponent);
