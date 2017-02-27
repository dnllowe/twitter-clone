'use strict';
import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import store from '../../redux/store';
import selectUser from '../../redux/action-creators/selectUser';

import TweetList from '../components/TweetList.js';
import Avatar from '../components/Avatar';

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

        <div>
           <div className='col-sm-5 text-center fade-in-slide-up-fast'> 
            <h1>{`${this.props.selectedUser.username}'s profile`}</h1>
            <Avatar url='https://unsplash.it/250/250/?random'/>
            <br/><br/>
            <button className='button-ternary border-primary'>Follow</button>
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