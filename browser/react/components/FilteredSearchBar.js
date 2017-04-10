'use strict';
import React from 'react';
import store from '../../redux/store';
import { Link } from 'react-router';

class FilteredSearchBar extends React.Component {

  constructor() {
    super();
    this.state = {
      searchInput: ''
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({
     [event.target.name]: event.target.value
    })
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
          onChange={ this.handleInput}
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
      </div>
    );
  }
}

export default FilteredSearchBar;