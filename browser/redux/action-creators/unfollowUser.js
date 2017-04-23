'use strict';

import axios from 'axios';
import actions from '../actions';

const followUser = (updatedUser) => {
  return {
    type: actions.UNFOLLOW_USER,
    user: updatedUser
  }
}

const fetchFollowUser = (currentUserId, followedUsername) => {
  return (dispatch) => {
    axios.put(`/api/users/${currentUserId}/unfollow/${followedUsername}`)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(followUser(updatedUser))
      })
    }
}

export default followUser