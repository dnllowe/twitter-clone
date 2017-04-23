'use strict';
import React from 'react';
import axios from 'axios';

import store from '../../redux/store';
import selectUser from '../../redux/action-creators/selectUser';

import TweetList from '../components/TweetList.js';
import Avatar from '../components/Avatar';

import fetchFollowUser from '../../redux/action-creators/followUser'
import fetchSubscriptions from '../../redux/action-creators/setSubscriptions'

class UserPageContainer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      userHandle: props.params.username,
      tweets: null,
      error: null
    }

    this.followUser = this.followUser.bind(this)
  }

  componentDidMount() {
    store.dispatch(selectUser(this.props.params.username))
    .then(potentialError => {
      if (potentialError) {
        this.setState({error: potentialError});
      }
    })
    .catch(console.error);

    this.updateTweets();
    this.syncId = setInterval(() => this.updateTweets, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.syncId);
  }

  updateTweets() {
    axios.get(`/api/tweets/user/${this.props.params.username}`)
    .then(res => res.data)
    .then(tweets => {
      tweets.forEach((tweet) => {
        tweet.animate = true;
      });
      this.setState({tweets})
    })
    .catch(console.error);
  }

  followUser() {

    let loggedInUser = store.getState().user.loggedInUser

    // If no one is logged in, prompt to sign up or login first
    if (!loggedInUser) {
      window.alert('You must be logged in to follow other users')
      return
    }

    let userId = loggedInUser.id
    console.log(userId)
    store.dispatch(fetchFollowUser(userId, this.props.params.username))
    store.dispatch(fetchSubscriptions(userId))
  }

  render() {

    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.props.selectedUser &&

        <div>
           <div className='col-sm-5 text-center fade-in-slide-up-fast'>
            <h1>{`${this.props.selectedUser.username}'s profile`}</h1>
            <Avatar url='https://unsplash.it/250/250/?random'/>
            <br/><br/>
            <button
              className='button-ternary border-primary'
              onClick={this.followUser}
            >
              Follow
            </button>
          </div>
          <div className='col-sm-4'>
            <TweetList
              tweets={this.state.tweets}
              header={`Tweets`}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

export default UserPageContainer;