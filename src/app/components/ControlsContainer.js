// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextSong, prevSong, resume, pause, updateTime, changeVolume } from '../../audio/actions';

import ControlsComponent from './ControlsComponent.jsx';

const mapStateToProps = (state) => ({
    audioState: state.audioState,
    // isPlaying: state.audioState.isPlaying,
    // isFocused: state.audioState.isFocused,
    // volume: state.audioState.volume,
    // time: state.audioState.time,
    // playlist: state.audioState.playlist,
    // currentIndex: state.audioState.currentIndex,
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
