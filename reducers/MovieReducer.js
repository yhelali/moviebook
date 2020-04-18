import {
  LOAD_MORE_MOVIES
} from '../actions/types';

const INITIAL_STATE = {
  movies: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MORE_MOVIES:
      return { ...state, movies: action.payload.items };
    default:
      return state;
  }
};
