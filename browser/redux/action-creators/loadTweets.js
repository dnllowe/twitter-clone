'use strict';
import axios from 'axios';
import actions from '../actions';

export const loadTweets = (currentTweets) => {
  return {
    type: actions.LOAD_TWEETS,
    currentTweets
  }
}

const fetchTweets = (route) => {
  return (dispatch, prevState) => {
    return axios.get(route)
    .then(res => res.data)
    .then((tweets) => {
      tweets.forEach((tweet) => {
        tweet.animate = true;
      });

      dispatch(loadTweets(tweets));
    });
  }
}

export default fetchTweets;