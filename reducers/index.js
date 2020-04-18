import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MovieReducer from './MovieReducer';
import ReviewReducer from './ReviewReducer';

export default combineReducers({
  auth: AuthReducer,
  movie: MovieReducer,
  review: ReviewReducer,
});
