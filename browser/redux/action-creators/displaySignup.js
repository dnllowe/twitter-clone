'use strict'

import actions from '../actions';

const displaySignup = (isOn) => {
  return {
    type: actions.DISPLAY_SIGNUP,
    isOn
  }
}

export default displaySignup;