'use strict'

import actions from '../actions';

export default (prompt) => {
  return {
    type: actions.CHANGE_PROMPT,
    prompt
  }
}