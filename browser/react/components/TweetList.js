'use strict'
import React from 'react';

import TweetDisplay from '../components/TweetDisplay';

/**
 * Creates a list of tweets
 * Requires props: 
 * @prop {String} username should be user.username
 * @prop {String} handle should be user.handle
 * @prop {String} content should be tweet.content
 * @prop {String} name should be user.fullname
 * @prop {String} id should be tweet.id
 * @prop {String} animate should be tweet.animate
 * @prop {String} key should be tweet.id
 */
const TweetList = (props) =>  {
  return (
    <div>
    <h1 className='text-center'>{props.header}</h1>
    <br/>
    <div className='col-xs-offset-2'>
      {props.tweets && props.tweets.map(tweet => {
        return (                 
          <TweetDisplay 
            username={tweet.user.username}
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
    </div>
  );
}

export default TweetList;