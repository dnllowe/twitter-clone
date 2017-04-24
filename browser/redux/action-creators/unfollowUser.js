'use strict';

import axios from 'axios';
import actions from '../actions';

const unfollowUser = (updatedUser) => {
  return {
    type: actions.UNFOLLOW_USER,
    user: updatedUser
  }
}

const fetchUnfollowUser = (currentUserId, followedUsername) => {
  return (dispatch) => {
    return axios.put(`/api/users/${currentUserId}/unfollow/${followedUsername}`)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(unfollowUser(updatedUser))
      })
    }
}

export default fetchUnfollowUser