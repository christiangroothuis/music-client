import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHome } from '../../api/actions';

import HomeComponent from './HomeComponent';

HomeComponent.propTypes = {
    home: PropTypes.object.isRequired,
    getHome: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    home: state.apiState.home,
    audioState: state.audioState
})

const dispatchToProps = (dispatch) => ({
    getHome: () => dispatch(getHome())
})

export default connect(mapStateToProps, dispatchToProps)(HomeComponent);
