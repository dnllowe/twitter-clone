'use strict'
import axios from 'axios';
import actions from '../actions';
import initialState from '../initialState';
import store from '../store';

const defaultState = {
  user: initialState.user,
}

export default (prevState = defaultState, action) => {

  let newState = Object.assign({}, prevState);

  switch(action.type) {

    case actions.CREATE_USER:
      newState.loggedInUser = action.user;
      break;
    case actions.SELECT_USER:
      newState.selectedUser = action.selectedUser;
      break;
    case actions.SET_ALL_USERS:
      newState.allUsers = action.allUsers;
      break;
    case actions.LOGIN_USER:
      newState.loggedInUser = action.user;
      break;
    case actions.LOGOUT_USER:
      newState.loggedInUser = null;
      break;
    case actions.FOLLOW_USER:
      newState.loggedInUser = action.user;
      break;
    case actions.UNFOLLOW_USER:
      newState.loggedInUser = action.user;
      break;
    case actions.SET_SUBSCRIPTIONS:
      newState.subscriptions = action.subscriptions
      break
    case actions.SET_FOLLOWERS:
      newState.followers = action.followers
      break
    default:
      return prevState;
  }

  return newState;

}