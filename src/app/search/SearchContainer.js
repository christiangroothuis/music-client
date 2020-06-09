// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFocus } from '../../audio/actions';

import SearchComponent from './SearchComponent.jsx';

// AlbumComponent.propTypes = {
// artists: PropTypes.isRequired,
// getArtist: PropTypes.func.isRequired,
// }

const mapStateToProps = (state) => ({
    audioState: state.audioState,
})

const dispatchToProps = (dispatch) => ({
    setFocus: focus => dispatch(setFocus(focus)),
})

export default connect(mapStateToProps, dispatchToProps)(SearchComponent);
