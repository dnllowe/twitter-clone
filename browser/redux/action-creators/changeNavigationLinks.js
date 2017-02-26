'use strict'

import actions from '../actions';

export default (navigationLinks) => {
  return {
    type: actions.CHANGE_NAVIGATION_LINKS,
    navigationLinks
  }
}