import {
  REVIEW_FORM_CHANGED,
  REVIEW_CREATE,
} from './types';

export const reviewUpdate = ({ prop, value }) => {
  return {
    type: REVIEW_FORM_CHANGED,
    payload: { prop, value }
  };
};

export const reviewCreate = ({ navigation, title, platform, rating, comment }) => {
  navigation.navigate('You');

  return {
    type: REVIEW_CREATE,
    payload: { title, platform, rating, comment }
  };
};

/*export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        //navigation
      });
  };
};*/
