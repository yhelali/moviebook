import {
  REVIEW_FORM_CHANGED,
  REVIEW_CREATE,
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  platform: '',
  comment: '',
  rating: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REVIEW_FORM_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case REVIEW_CREATE:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
