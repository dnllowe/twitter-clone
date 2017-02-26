'use strict'

import actions from '../actions';
import initialState from '../initialState';

const defaultState = {
  input: initialState.input
}

export default (prevState = defaultState, action) => {

  let newState = Object.assign({}, prevState);

  switch(action.type) {
    case actions.UPDATE_PASSWORD_INPUT:
      newState.password = action.password;
      break;
    case actions.UPDATE_USERNAME_INPUT:
      newState.username = action.username;
      break;
    default:
      return prevState;
  }
  
  return newState;
}