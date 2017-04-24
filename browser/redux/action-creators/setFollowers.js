'use strict'

import axios from 'axios'

import actions from '../actions'

const setFollowers = (followers) => {
  return {
    type: actions.SET_FOLLOWERS,
    followers
  }
}

const fetchSetFollowers = (userId) => {
  return (dispatch) => {
    axios.get(`/api/users/${userId}/followers`)
    .then(res => res.data)
    .then(followers => dispatch(setFollowers(followers)))
    .catch(console.error)
  }
}

export default fetchSetFollowers