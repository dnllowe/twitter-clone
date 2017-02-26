import React from 'react';
import Transition from 'react-addons-css-transition-group';
import {Link} from 'react-router';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

const NavigationBar = (props) => {

  // STORE LINKS IN ARRAY FOR USE LATER
  let links = [];

  if(props.links) {
    links = props.links.map((link, index) =>{
      return (
        <Link to='/' key={index}>
          <li className='nav-item'>{link}</li>
        </Link>
        
      );
    });
  }

  return (
    <div className='fixed-wrapper'>
      <div className='nav-bar'>
        <ul>
          {links}
        </ul>
        <Transition
          transitionName='fade'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {props.loggedIn && 
            <button className={
              `button-ternary-small 
              col-lg-offset-6 
              col-md-offset-4 
              col-sm-offset-3
              hidden-xs`}
              onClick={() => store.dispatch(logout())}
            >
              Logout {props.name}
            </button>
          }
        </Transition>
      </div>
    </div>
  );
}

export default NavigationBar;

