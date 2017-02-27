'use strict'
import React from 'react'
import axios from 'axios';

import TweetList from '../components/TweetList';

class RelatedTweetsPageContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      tweets: []
    }
  }

  componentDidMount() {
    this.updateTweets();
  }

  componentWillUpdate() {
    this.updateTweets();
  }

  updateTweets() {
    axios.get(`/api/tweets/related/${this.props.params.hashTag}`)
    .then(res => res.data)
    .then(tweets => {
      tweets.forEach(tweet => {
        tweet.animate = true;
      })
      this.setState({tweets})
    })
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <div 
        className='hidden-xs'
        style={ {
          position: 'absolute', 
          top: '35%', 
          right: '80%', 
          transform: 'translateX(50%)'} }>
          <h1 className='fade-in-slide-up-med' style={ {fontSize: '4.25em'} }>{`#${this.props.params.hashTag}`}</h1>
        </div>
        <div className='col-sm-offset-5 col-sm-4 col-xs-12'>
          <TweetList 
            tweets={this.state.tweets}
            header={`#${this.props.params.hashTag}`}
          />
        </div>
      </div>
    );
  }
}

export default RelatedTweetsPageContainer;