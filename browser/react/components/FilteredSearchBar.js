'use strict';
import React from 'react';
import store from '../../redux/store';
import { Link, browserHistory } from 'react-router';

class FilteredSearchBar extends React.Component {

  constructor() {
    super();
    this.state = {
      searchInput: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
  }

  handleInput(event) {
    this.setState({
     [event.target.name]: event.target.value
    })
  }

  handleEnter(event) {
    if (this.state.searchInput[0] === '#' && event.keyCode === 13) {
      this.handleSubmit(event)
    }
  }

  handleSubmit(event) {
    const searchInput = this.state.searchInput.slice(1, this.state.searchInput.length)
    browserHistory.push(`/tweets/related/${searchInput}`)
  }

  render() {
    let items = [];

    // Results should only display after user types something valid
    if (this.props.items && this.state.searchInput !== '') {
      items = this.props.items.filter((item) => {
        return item.username.match(this.state.searchInput);
      });
    }

    return (
      <div>
        <input
          className='input-field'
          style={{ width: '75%' }}
          placeholder={this.props.placeholder}
          name='searchInput'
          onChange={ this.handleInput }
          onKeyDown={ this.handleEnter }
        />
        <br />
        <ul className='no-bullets'>
          {
            items && items.map(item => {
              return (
                <Link to={`/user/${item.username}`} key={item.id}>
                  <li>{item.username}</li>
                </Link>
              )
            })
          }
        </ul>
        {
          this.state.searchInput[0] === '#' &&
            <button
              className='button-primary'
              style={ {display: false } }
              onClick={this.handleSubmit}
            >
              Search #s
            </button>
        }
      </div>
    );
  }
}

export default FilteredSearchBar;