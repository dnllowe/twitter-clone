'use strict';

import axios from 'axios';
import actions from '../actions';

const fetchFollowUser = (currentUserId, followedUsername) => {

  axios.put(`/api/users/${currentUserId}/unfollow/${followedUsername}`)
    .then(res => res.data)
    .then(updatedUser => {
      followUser(updatedUser)
    })
}

const followUser = (updatedUser) => {
  return {
    type: actions.UNFOLLOW_USER,
    user: updatedUser
  }
}

export default followUser