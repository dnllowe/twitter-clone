'use strict'
import axios from 'axios';
import actions from '../actions';

export const loadHashtags = (currentHashtags) => {
  return {
    type: actions.LOAD_HASHTAGS,
    currentHashtags
  }
}

const fetchHashtags = (route) => {
  return (dispatch, prevState) => {
    return axios.get(route)
    .then(res => res.data)
    .then(currentHashtags => {
      currentHashtags.forEach(hashTag => {
        hashTag.animate = true;
      });
      dispatch(loadHashtags(currentHashtags));
    });
  }
}

export default fetchHashtags;