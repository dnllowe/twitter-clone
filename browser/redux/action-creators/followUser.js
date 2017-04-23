'use strict';

import axios from 'axios';
import actions from '../actions';

const updateUser = (updatedUser) => {

  return {
    type: actions.FOLLOW_USER,
    user: updatedUser
  }
}

const fetchFollowUser = (currentUserId, followedUsername) => {
  return (dispatch) => {
    return axios.put(`/api/users/${currentUserId}/follow/${followedUsername}`)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(updateUser(updatedUser))
      })
  }
}

export default fetchFollowUser