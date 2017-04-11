'use strict';
import axios from 'axios';
import actions from '../actions';

export const selectUser = (selectedUser) => {
  return {
    type: actions.SELECT_USER,
    selectedUser
  }
}

const fetchUser = (username) => {
  return (dispatch) => {
    return axios.get('/api/users/info/' + username)
    .then(res => res.data)
    .then(user => {
      if(user.error){return user.error;}
      dispatch(selectUser(user));
    });
  }
}

export default fetchUser;