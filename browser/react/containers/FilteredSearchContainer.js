'use strict';

import React from 'react';
import store from '../../redux/store';
import FilteredSearchBar from '../components/FilteredSearchBar';

class FilteredSearchContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      allUsers: null
    }
  }

  componentDidMount() {
    this.setState({ allUsers: store.getState().user.allUsers });
    this.unsubscribe = store.subscribe(() => {
      this.setState({ allUsers: store.getState().user.allUsers });
    });
  }  

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <FilteredSearchBar
      items={this.state.allUsers}
      placeholder="Look for people to follow by username or hashtags"
    />
  }
}

export default FilteredSearchContainer;