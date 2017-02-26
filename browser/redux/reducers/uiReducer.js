'use strict'

import actions from '../actions';
import initialState from '../initialState';

const defaultState = {
  ui: initialState.ui
}

export default (prevState = defaultState, action) => {

  let newState = Object.assign({}, prevState);

  switch(action.type) {
    case actions.CHANGE_PROMPT:
      newState.prompt = action.prompt;
      break;
    case actions.CHANGE_NAVIGATION_LINKS:
      newState.navigationLinks = [...action.navigationLinks];
      break;
    case actions.DISPLAY_SIGNUP:
      newState.isSignupDisplaying = action.isOn;
      break;
    default:
      return prevState;
  }

  return newState; 

}