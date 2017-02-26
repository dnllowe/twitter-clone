'use strict';

import actions from '../actions';

export default selectUser = (selection) => {
  return {
    type: actions.SELECT_USER,
    selectedUser: selection
  }
}