import firebase from 'firebase';
import {
  PROP_LOGIN_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const loginUpdate = ({ prop, value }) => {
  return {
    type: PROP_LOGIN_CHANGED,
    payload: { prop, value }
  };
};

export const loginUser = ({ login, password , navigation }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(login, password)
      .then(user => loginUserSuccess(dispatch, user, navigation))
      .catch((error) => {
        console.warn(error);

        firebase.auth().createUserWithEmailAndPassword(login, password)
          .then(user => loginUserSuccess(dispatch, user, navigation))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  navigation.navigate('App');
};
