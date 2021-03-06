'use strict';
import React from 'react';
import axios from 'axios';

import store from '../../redux/store';
import selectUser from '../../redux/action-creators/selectUser';

import TweetList from '../components/TweetList.js';
import Avatar from '../components/Avatar';

import fetchFollowUser from '../../redux/action-creators/followUser'
import fetchSubscriptions from '../../redux/action-creators/setSubscriptions'
import fetchUnfollowUser from '../../redux/action-creators/unfollowUser'

class UserPageContainer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      userHandle: props.params.username,
      tweets: null,
      error: null
    }
    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
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
    store.dispatch(fetchFollowUser(userId, this.props.params.username))
    .then(() => store.dispatch(fetchSubscriptions(userId)))
    .catch(console.error)
  }

  unfollowUser() {

    let loggedInUser = store.getState().user.loggedInUser
    let userId = loggedInUser.id
    store.dispatch(fetchUnfollowUser(userId, this.props.params.username))
    .then(() => store.dispatch(fetchSubscriptions(userId)))
    .catch(console.error)
  }

  render() {

    let loggedInUser = this.props.loggedInUser
    let subscriptions = this.props.subscriptions
    let selectedUser = this.props.selectedUser
    let displayFollow = true
    let displayUnfollow = false

    // A user can't follow themselves
    if (loggedInUser && selectedUser && loggedInUser.username === selectedUser.username) {
      displayFollow = false
      // If already following a user, set button to Unfollow
    } else if (loggedInUser && subscriptions && selectedUser) {

      for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].username === selectedUser.username) {
          displayFollow = false
          displayUnfollow = true
        }
      }
    }

    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.props.selectedUser &&

        <div>
           <div className='col-sm-5 text-center fade-in-slide-up-fast'>
            <h1>{`${this.props.selectedUser.username}'s profile`}</h1>
            <Avatar url='https://unsplash.it/250/250/?random'/>
            <br /><br />

            {/*FOLLOW BUTTON*/}
            {
              displayFollow &&
              <button
                className='button-ternary border-primary'
                onClick={this.followUser}
              >
                Follow
                </button>
            }

            {/*UNFOLLOW BUTTON*/}
            { displayUnfollow &&
                <button
                  className='button-ternary border-primary'
                  onClick={this.unfollowUser}
                >
                  Unfollow
                </button>
            }
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