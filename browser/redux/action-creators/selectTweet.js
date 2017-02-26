'use strict';

import axios from 'axios';

import actions from '../actions';

export const selectTweet = selectedTweet => {
  return {
    type: actions.SELECT_TWEET,
    selectedTweet
  }
}

const fetchTweet = tweetId => {

  return (dispatch, prevState) => {
    return axios.get(`/api/tweets/tweet/${tweetId}`)
    .then(res => res.data)
    .then((tweet) => {
      dispatch(selectTweet(tweet));
    });
  }
}

export default fetchTweet;