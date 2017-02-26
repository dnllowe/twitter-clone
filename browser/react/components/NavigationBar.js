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
        <Link to={link.url} key={index}>
          <li className='nav-item'>{link.text}</li>
        </Link>
        
      );
    });
  }

  return (
    <ul>
      {links}
    </ul>
  );
}

export default NavigationBar;

