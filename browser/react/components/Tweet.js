'use strict'
import React from 'react';
import {Link} from 'react-router';

import store from '../../redux/store';
import loadTweets from '../../redux/action-creators/loadTweets';

const Tweet = (props) => {

  const contentArray = props.content.split(' ');
  const contentLength = contentArray.length;
  const clear = <div style={ {clear: 'both'} }></div>

  const content = (
    contentArray.map((word, index) => {
    
      const wordCleaned = word.replace(/#/, '');
      let space = <span>&nbsp;</span>
      if(index === contentLength -1) {
        space = null;
      }

      return (
        word.indexOf('#') !== -1 ? 
        <span key={index} style={ {float: 'left'} }>
          <strong>
            <Link to={`/tweets/related/${wordCleaned}`}
              onClick={() => {
                store.dispatch(loadTweets(`/api/tweets/related/${wordCleaned}`))
              }}>
              {word}
            </Link>
            {space}
          </strong>
        </span>
        : <span key={index} style={ {float: 'left'} }>{word}{space}</span>
      );
    })
  );

  return (
    <div className='tweet'>
      <Link to={`/tweets/${props.id}`}>
        {content}
      </Link>
      {clear}
    </div>
  );
}

export default Tweet;