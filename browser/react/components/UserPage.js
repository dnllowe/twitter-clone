'use strict';
import React from 'react';

import TweetList from '../components/TweetList.js';

const UserPage = (props) => {

  return (
    <div>
     <TweetList
        tweets={props.tweets}
        header={`Tweets`}
      />
    </div>
  );
}

export default UserPage;
