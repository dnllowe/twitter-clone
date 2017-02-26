'use strict'
import React from 'react';
import {Link} from 'react-router';

import HamburgerMenu from '../components/HamburgerMenu';
import navApi from '../../../public/js/NavApi';

class HamburgerMenuContainer extends React.Component {

  constructor(props) {
    super();
    this.state = {
      links: props.links,
      showMenu: false,
      menuIcon: '\u2630'
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.updateLinks(this.state.links, this.toggleMenu);
  }

  componentWillReceiveProps(nextProps) {

    // Compare text of links to determine if any changed

    const currentLinks = this.state.links.map(link => {
      return link.text;
    });

    const nextLinks = nextProps.links.map(link => {
      return link.text;
    });

    // Convert to string to allow for shallow comparison of arrays
    if(currentLinks.join(' ') !== nextLinks.join(' ')) {
      this.updateLinks(nextProps.links, this.toggleMenu);
    }
  }

  /**
   * Updates current links with new callbacks. Updtes state with new links
   * @param {Object[]} links An array of link objects (with properties text, url, and callbacks)
   * @param {Function|Function[]} callbacks A callback function or array of callback functions
   */
  updateLinks(links, callbacks) {
    const linksWithCallbacks = 
      navApi.addCallbacksToLinks(links, callbacks);
    this.setState({links: linksWithCallbacks});
  }

  /**
   * Sets display state of dropdown menu to on/off
   */
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

    if(this.props.loggedIn) {
      
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
        <HamburgerMenu
          links={this.state.links}
          showMenu={this.state.showMenu}
        />
      </div>
    );
  }
}

export default HamburgerMenuContainer;