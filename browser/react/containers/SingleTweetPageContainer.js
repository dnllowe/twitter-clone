'use strict'

import React from 'react';

import selectTweet from '../../redux/action-creators/selectTweet';
import store from '../../redux/store';
import SingleTweetPage from '../components/SingleTweetPage';
import Avatar from '../components/Avatar';

class SingleTweetPageContainer extends React.Component {
  
  constructor() {
    super();
    this.state = {
      tweet: null
    }
  }
  componentDidMount() {
    store.dispatch(selectTweet(this.props.params.tweetId));
    this.unsubscribe = store.subscribe(() => {
      this.setState({tweet: store.getState().tweets.selectedTweet});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (

      <div className='col-xs-12'>
        <Avatar url='https://unsplash.it/50/50/?random'/>
        <SingleTweetPage tweet={this.state.tweet}/>
      </div>
    );
  }
}

export default SingleTweetPageContainer;