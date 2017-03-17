'use strict'

import actions from '../actions';

const updateUsernameInput = (username) => {
  return {
    type: actions.UPDATE_USERNAME_INPUT,
    username
  }
}

export default updateUsernameInput;