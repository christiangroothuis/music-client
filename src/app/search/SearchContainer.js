import { connect } from 'react-redux';
import { setFocus } from '../../audio/actions';

import SearchComponent from './SearchComponent.jsx';

const mapStateToProps = (state) => ({
    // audioState: state.audioState,
})

const dispatchToProps = (dispatch) => ({
    setFocus: focus => dispatch(setFocus(focus)),
})

export default connect(mapStateToProps, dispatchToProps)(SearchComponent);
