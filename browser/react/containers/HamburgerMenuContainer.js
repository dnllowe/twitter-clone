'use strict'
import React from 'react';
import {Link} from 'react-router';

import HamburgerMenu from '../components/HamburgerMenu';
import navApi from '../../../public/js/NavApi';
import LogoutButton from '../components/LogoutButton';

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

    // Ensure callbacks are passed into onClick as an array
    let callbacksArray = [];

    if(typeof(callbacks) === 'function') {
      callbacksArray.push(callbacks);
    } else if(Array.isArray(callbacks)) {
      callbacksArray = [...callbacks];
    } else {
      throw new Error('callbacks paramater must be function or array of functions')
    }

    // Ensure links are an array
    let linksArray = [];

    if(typeof(links) === Object) {
      linksArray.push(links);
    } else if(Array.isArray(links)) {
      linksArray = [...links];
    } else {
      throw new Error('links paramater must be link Object or array of link objects')
    }

    const updatedLinks = linksArray.map((link, index) => {
      // Combine new callbacks with any set previously
      const callbacks = [...link.callbacks, ...callbacksArray];
      return (
        <Link to={link.url} key={index}>
          <li 
            className='hamburger-menu-item' 
            onClick={() => {callbacks.forEach(callback => callback())}}>
            {link.text}
          </li>
        </Link>       
      );
    });

    this.setState({links: updatedLinks});
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

    return (
      <div>
        <div className='fixed-wrapper'>
          <div className='hamburger-menu-bar'>
            <span onClick={this.toggleMenu}>
              <a href='#'>&nbsp;&nbsp;&nbsp;{this.state.menuIcon}</a>
            </span> 
          </div>
        </div>
        <HamburgerMenu links={this.state.links} showMenu={this.state.showMenu}>
          {this.state.links}
        </HamburgerMenu>
      </div>
    );
  }
}

export default HamburgerMenuContainer;