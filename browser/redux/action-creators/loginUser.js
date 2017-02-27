'use strict';
import axios from 'axios';

import store from '../store';
import actions from '../actions';

export const loginUser = (user) => {
  return {
    type: actions.LOGIN_USER,
    user
  }
}


/**
 * Check database for matching username and password
 * Attempt login using username and password from current state
 */
const attemptLogin = () => {
  return(dispatch, prevState) => {

    const reqBody = {
      username: prevState().input.username,
      password: prevState().input.password
    }

    return axios.post('/api/users/login', reqBody)
    .then(res => res.data)
    .then(verifiedUser => {

      // SHOULD DO SOMETHING AND RETURN IF LOGIN FAILED
      if(verifiedUser.error) {return verifiedUser.error;}
      dispatch(loginUser(verifiedUser));
    });
  }
}

export default attemptLogin;