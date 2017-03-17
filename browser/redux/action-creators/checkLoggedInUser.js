'use strict'
import axios from 'axios';

import store from '../store';
import {loginUser} from '../action-creators/loginUser';

export const checkLoggedInUser = () => {
  return (dispatch) => {
    return axios.get('/api/users/current-user')
    .then(res => res.data)
    .then(user => {

      // If this was just an anonymous user, don't log loginUser
      // session will still keep track, but UI won't update
      if(user && user.firstname === 'Anonymous') {return;}

      dispatch(loginUser(user));
    });
  }
}

export default checkLoggedInUser;