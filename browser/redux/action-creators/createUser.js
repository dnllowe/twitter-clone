'use strict'
import axios from 'axios';

import actions from '../actions';

export const createUser = (user) => {
  return {
    type: actions.CREATE_USER,
    user
  }
}

const createUserRequest = (user) => {
  return (dispatch) => {
    return axios.post('/api/users', user)
    .then(res => res.data)
    .then(user => {

      if(user.error) {return user.error;}
      dispatch(createUser(user));
    });
  }
}

export default createUserRequest;