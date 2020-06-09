// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextSong, prevSong, resume, pause, updateTime, changeVolume } from '../../audio/actions';

import ControlsComponent from './ControlsComponent.jsx';

// AlbumComponent.propTypes = {
// artists: PropTypes.isRequired,
// getArtist: PropTypes.func.isRequired,
// }

const mapStateToProps = (state) => ({
    audioState: state.audioState,
})

const dispatchToProps = (dispatch) => ({
    resume: () => dispatch(resume()),
    pause: () => dispatch(pause()),
    nextSong: () => dispatch(nextSong()),
    prevSong: () => dispatch(prevSong()),
    updateTime: info => dispatch(updateTime(info)),
    changeVolume: volume => dispatch(changeVolume(volume)),
})

export default connect(mapStateToProps, dispatchToProps)(ControlsComponent);
