'use strict'
import React from 'react';
import {Link} from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

const HamburgerMenu = (props) => {

  return (
    <div>    
      {/*// Wrap the menu in a relative positioned container 
      // so that it sits beneath the menu bar. 
      // Otherwise, the absolute positioning would make it overlap*/}
      <div className='relative-wrapper'> 
        <Transition
          transitionName='slide-from-top'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >        
          {props.showMenu && 
            <div className='hamburger-menu'>
              <ul>
                {props.children}
              </ul>          
            </div>
          }
        </Transition>  
      </div>
    </div>  
  );
}

export default HamburgerMenu;