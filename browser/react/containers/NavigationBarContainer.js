'use strict';
import React from 'react';
import Transition from 'react-addons-css-transition-group';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

import NavigationBar from '../components/NavigationBar';

class NavigationBarContainer extends React.Component {

  render() {
    return (
      <div className='fixed-wrapper'>
        <div className='nav-bar'>
          <NavigationBar
            links={this.props.links}
          />
          <Transition
          transitionName='fade'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
          >
          {this.props.loggedIn && 
            <button className={
              `button-ternary-small 
              col-lg-offset-6 
              col-md-offset-4 
              col-sm-offset-3
              hidden-xs`}
              onClick={() => store.dispatch(logout())}
            >
              Logout {this.props.name}
            </button>
          }
        </Transition>
      </div>
    </div>
    );
  }
}

export default NavigationBarContainer;