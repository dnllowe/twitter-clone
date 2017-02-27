import React from 'react';
import Transition from 'react-addons-css-transition-group';
import {Link} from 'react-router';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

import LogoutButton from './LogoutButton';

const NavigationBar = (props) => {

  // STORE LINKS IN ARRAY FOR USE LATER
  let links = [];

  if(props.links) {
    links = props.links.map((link, index) =>{
      return (
        <Link to={link.url} key={index}>
          <li className='nav-item'>{link.text}</li>
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
          <LogoutButton
            text={`Logout ${props.name}`}
            class={`
              button-ternary 
              col-lg-offset-6 
              col-md-offset-4 
              col-sm-offset-3
              hidden-xs`}/>
        }
        </Transition>
      </div>
    </div>
  );
}

export default NavigationBar;

