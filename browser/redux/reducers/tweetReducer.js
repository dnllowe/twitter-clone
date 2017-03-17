'use strict'

import actions from '../actions';
import initialState from '../initialState';

const defaultState = {
  tweets: initialState.tweets
}

export default (prevState = defaultState, action) => {

  let newState = Object.assign({}, prevState);

  switch(action.type) {
    case actions.LOAD_TWEETS:
      newState.currentTweets = action.currentTweets;
      break;
    case actions.SELECT_TWEET:
      newState.selectedTweet = action.selectedTweet;
      break;
    case actions.ADD_TWEET:
      const newTweets = Array.prototype.concat([action.tweet], prevState.currentTweets.slice(0, 4));
      newState.currentTweets = newTweets;
      break;
    case actions.LOAD_HASHTAGS:
      newState.currentHashtags = action.currentHashtags;
      break; 
    default:
      return prevState;
  }
  return newState;
}

