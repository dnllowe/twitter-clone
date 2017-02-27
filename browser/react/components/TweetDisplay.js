'use strict'

import React from 'react';
import {Link} from 'react-router';

import Avatar from './Avatar';
import Tweet from './Tweet';

const TweetDisplay = (props) => {
    
  let classNameString = 'tweet-display';
  if(props.animate) {classNameString += ' fade-in-slide-up-faster';}
  
  return (
    <div className={classNameString}>
     
      <div style={ {float: 'left', clear: 'both'}}>
        <Avatar url='https://unsplash.it/50/50/?random'/>
      </div>
      <span className='username'>{props.name}&nbsp;</span> 
      <span className='handle'>
        <Link to={`/user/${props.username}`}>{props.handle}</Link>
      </span>
      <br />
        <Tweet content={props.content} id={props.id}/>

    </div>
  );
}

export default TweetDisplay;