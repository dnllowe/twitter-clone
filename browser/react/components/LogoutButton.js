'use strict';
import React from 'react';
import Transition from 'react-addons-css-transition-group';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

const LogoutButton = (props) => {

  return (
    <button 
      className={`button-ternary-small ${props.class}`} 
      onClick={() => store.dispatch(logout())}
    >
    {props.text}
    </button>
  );
}

export default LogoutButton;