'use strict';
import axios from 'axios';

import actions from '../actions';

export const logoutUser = () => {
  return {
    type: actions.LOGOUT_USER
  }
}

const logoutUserRequest = () => {
  return (dispatch) => {
    return axios.delete('/api/users/logout')
    .then(() => {
      dispatch(logoutUser());
    });
  }
}
export default logoutUserRequest;