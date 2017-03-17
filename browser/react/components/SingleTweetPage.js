'use strict'
import React from 'react';

import Tweet from './Tweet';

const SingleTweetPage = (props) => {
  const tweet = props.tweet;
  return (
    <div>
      {
        tweet && 
        <div>
          <h1>{tweet.user.username}</h1>
          <h2>{tweet.user.handle}</h2>
          <Tweet content={tweet.content} id={tweet.id}/>
        </div>
      }
    </div>
  );
}

export default SingleTweetPage;