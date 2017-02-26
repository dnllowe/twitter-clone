'use strict'
import React from 'react';

import TweetDisplay from '../components/TweetDisplay';

const TweetList = (props) =>  {
  return (
    <div>
    <h1>{props.header}</h1>
    <br/>
      {props.tweets && props.tweets.map(tweet => {
        return (                 
          <TweetDisplay 
            handle={tweet.user.handle} 
            content={tweet.content} 
            name={tweet.user.fullname}
            id={tweet.id}
            animate={tweet.animate}
            key={tweet.id}
          />
        );
      })}
    </div>
  );
}

export default TweetList;