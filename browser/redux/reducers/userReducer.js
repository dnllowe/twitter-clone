'use strict'
import axios from 'axios';
import actions from '../actions';
import initialState from '../initialState';

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
      debugger;  
      newState.allUsers = action.allUsers;
      console.log(action.allUsers);
      break;
    case actions.LOGIN_USER:
      newState.loggedInUser = action.user;
      break;
    case actions.LOGOUT_USER:
      newState.loggedInUser = null;
      break;
    default:
      return prevState;
  }

  return newState;

}