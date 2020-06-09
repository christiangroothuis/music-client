import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtists } from '../../api/actions';

import CollectionComponent from './CollectionComponent';

CollectionComponent.propTypes = {
    artists: PropTypes.array.isRequired,
    getArtists: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    artists: state.apiState.artists
})

const dispatchToProps = (dispatch) => ({
    getArtists: () => dispatch(getArtists())
})

export default connect(mapStateToProps, dispatchToProps)(CollectionComponent);
