'use strict';
import React from 'react';
import store from '../../redux/store';

class FilteredSearchBar extends React.Component {
  
  render() {
    const items = this.props.items;
    const placeholder = this.props.placeholder;

    return (
      <div>
        <input
          className='input-field'
          style={{ width: '75%' }}
          placeholder={placeholder}
        />
        <br />
        <p>
          {
            items && items.map(item => {
              return <span>{item.username}</span>;
            })
          }
        </p>
      </div>
    );
  }  
}

export default FilteredSearchBar;