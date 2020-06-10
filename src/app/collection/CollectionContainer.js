import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtists,getAlbums } from '../../api/actions';

import CollectionComponent from './CollectionComponent';

CollectionComponent.propTypes = {
    artists: PropTypes.array.isRequired,
    getArtists: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    artists: state.apiState.artists,
    albums: state.apiState.albums
})

const dispatchToProps = (dispatch) => ({
    getArtists: () => dispatch(getArtists()),
    getAlbums: () => dispatch(getAlbums())
})

export default connect(mapStateToProps, dispatchToProps)(CollectionComponent);
