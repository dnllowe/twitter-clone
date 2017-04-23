'use strict'

import axios from 'axios'

import actions from '../actions'

const setSubscriptions = (subscriptions) => {
  return {
    type: actions.SET_SUBSCRIPTIONS,
    subscriptions
  }
}

const fetchSubscriptions = (userId) => {
  return (dispatch) => {
    axios.get(`/api/users/${userId}/following`)
      .then(res => res.data)
      .then(subscriptions => {
        dispatch(setSubscriptions(subscriptions))
    })
  }
}

export default fetchSubscriptions