'use strict';
import React from 'react';

import TweetList from '../components/TweetList.js';

const UserPage = (props) => {

  return (
    <div>
      {props.user.username} <br/>
      {props.tweet}
     <TweetList
        tweets={props.tweets}
        header={`${props.user.username}'s tweets`}
      />
    </div>
  );
}

export default UserPage;
