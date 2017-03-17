'use strict'

import actions from '../actions';

const updatePasswordInput = (password) => {
  return {
    type: actions.UPDATE_PASSWORD_INPUT,
    password
  }
}

export default updatePasswordInput;