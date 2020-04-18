
import {
  LOAD_MORE_MOVIES
} from './types';

export const loadMovies = (index) => {
  const moviesData = require('../mock/json/movies.json');

  return {
    type: LOAD_MORE_MOVIES,
    payload: moviesData,
  };
};
