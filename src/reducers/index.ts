import { combineReducers } from 'redux';
import timeSlice from './timeSlice';
import githubSlice from './githubSlice';

export default combineReducers({
  time: timeSlice.reducer,
  github: githubSlice.reducer,
});
