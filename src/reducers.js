import { combineReducers } from 'redux';
import apiReducer from './api/reducer';
import audioReducer from './audio/reducer';

const rootReducer = combineReducers({
  apiState: apiReducer,
  audioState: audioReducer,
});

export default rootReducer;