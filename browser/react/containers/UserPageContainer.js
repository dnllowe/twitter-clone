'use strict';
import React from 'react';
import axios from 'axios';

import store from '../../redux/store';
import selectUser from '../../redux/action-creators/selectUser';

import UserPage from '../components/UserPage';

class UserPageContainer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      userHandle: props.params.username,
      tweets: null,
      error: null
    }
  }

  componentDidMount() {
    store.dispatch(selectUser(this.props.params.username))
    .then(potentialError => {
      if(potentialError) {
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
      debugger;
      tweets.forEach((tweet) => {
        tweet.animate = true;
      });
      this.setState({tweets})
    })
    .catch(console.error);
  }

  render() {

    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.props.selectedUser && 
        <UserPage 
          user={this.props.selectedUser}
          tweets={this.state.tweets}/>
        }
      </div>
    );
  }
}

export default UserPageContainer;