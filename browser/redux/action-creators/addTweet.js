'use strict';

import axios from 'axios';

import actions from '../actions';

export const addTweet = tweet => {

  return {
    type: actions.ADD_TWEET,
    tweet
  }
}

const postTweet = reqBody => {

  return (dispatch) => {
    return axios.post('/api/tweets', reqBody)
    .then(res => res.data)
    .then(newTweet => {
      newTweet.animate = true;
      dispatch(addTweet(newTweet));
    });
  }
}

export default postTweet;
