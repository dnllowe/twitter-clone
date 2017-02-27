'use strict';
import React from 'react';
import {Link} from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

import NavigationBar from '../components/NavigationBar';

class NavigationBarContainer extends React.Component {

  render() {

    // STORE LINKS IN ARRAY FOR USE LATER
  let links = [];

  if(this.props.links) {
    links = this.props.links.map((link, index) =>{
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
          <NavigationBar>
            {links}
            <Transition
              transitionName='fade'
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
            >
            {this.props.loggedIn && 
              <button className={
               `col-lg-offset-6 
                col-md-offset-4 
                col-sm-offset-3
                hidden-xs`}
                onClick={() => store.dispatch(logout())}
              >
              Logout {this.props.name}
              </button>
            }
            </Transition>
          </NavigationBar>
        </div>
      </div>
    );
  }
}

export default NavigationBarContainer;