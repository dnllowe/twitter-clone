import React from 'react';

import TweetDisplay from './TweetDisplay';

const RelatedTweetsPage = (props) => {
  
  return (
    <div className='col-xs-12'>
      <h1>{`#${props.hashTag}`}</h1>
      <br />
      {props.tweets && 
        props.tweets.map(tweet => {
          return (
            <TweetDisplay 
              handle={tweet.user.handle}
              content={tweet.content}
              name={tweet.user.name}
              id={tweet.id}
              key={tweet.id}
            />
          );
        })
      }
    </div>
  );
}

export default RelatedTweetsPage;