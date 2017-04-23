'use strict';

import axios from 'axios';
import actions from '../actions';

const updateUser = (updatedUser) => {

  console.log('UPDATED USER', updatedUser)
  return {
    type: actions.FOLLOW_USER,
    user: updatedUser
  }
}

const fetchFollowUser = (currentUserId, followedUsername) => {
  return (dispatch) => {
    axios.put(`/api/users/${currentUserId}/follow/${followedUsername}`)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(updateUser(updatedUser))
      })
  }
}

export default fetchFollowUser