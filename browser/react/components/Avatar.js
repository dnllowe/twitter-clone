import React from 'react';

/**
 * Displays image
 */
const Avatar = (props) => {
  return (
    <img className='avatar' src={props.url}/>
  ); 
}

export default Avatar;