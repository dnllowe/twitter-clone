'use strict'
import React from 'react';
import {Link} from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../../redux/store';
import logout from '../../redux/action-creators/logoutUser';

export default class HamburgerMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      showMenu: false,
      menuIcon: '\u2630'
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    if(this.state.showMenu) {
      this.setState({
        showMenu: false, 
        menuIcon: '\u2630' // This is the 3 bar glyph code
      });   
    } else {
      this.setState({
        showMenu: true,
        menuIcon: '[ x ]'
      });
    }
  }

  render() {

    // STORE LINKS IN ARRAY FOR USE LATER
    let links = [];

    if(this.props.links) {
      links = this.props.links.map((link, index) =>{
        return (
          <Link to='/' key={index}>
            <li className='hamburger-menu-item'>{link}</li>
          </Link>       
        );
      });
    }

    return (
      <div>
        <div className='fixed-wrapper'>
          <div className='hamburger-menu-bar'>
            <span onClick={this.toggleMenu}>
              <a href='#'>&nbsp;&nbsp;&nbsp;{this.state.menuIcon}</a>
            </span> 
          </div>
        </div>
        
          {/*// Wrap the menu in a relative positioned container 
          // so that it sits beneath the menu bar. 
          // Otherwise, the absolute positioning would make it overlap*/}
          <div className='relative-wrapper'> 

            <Transition
            transitionName='slide-from-top'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            >        
              {this.state.showMenu && 
                <div className='hamburger-menu'>
                  <ul>
                    {links}
                    {this.props.loggedIn && 
                      <a href='#'>
                        <li 
                        className='hamburger-menu-item'
                        onClick={() => {this.toggleMenu(); store.dispatch(logout())}}
                        >
                          Logout
                        </li>
                      </a>
                    }
                  </ul>          
                </div>
              }
          </Transition>  
        </div>
      </div>  
    );
  }
}

