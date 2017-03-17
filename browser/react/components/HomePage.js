import React from 'react';
import Transition from 'react-addons-css-transition-group';
import axios from 'axios';
import {Link} from 'react-router';

import store from '../../redux/store';
import TweetList from './TweetList';
import NavigationBar from './NavigationBar';
import Intro from './Intro';
import TweetField from './Tweetfield';
import Signup from './Signup';
import Avatar from './Avatar';

// ACTIONS
import loadTweets from '../../redux/action-creators/loadTweets';
import loadHashtags from '../../redux/action-creators/loadHashtags';
import changePrompt from '../../redux/action-creators/changePrompt';

class HomePage extends React.Component {

  constructor() {
    super();

    this.state = {
      tweets: [],
      hashtags: []
    };
  }

  componentDidMount() {

    //Initial route for tweets is just latest 5
    this.updateTweets(this.props.loggedInUser);
    this.updateHashtags();

    // Check for new tweets and hashtags every 5 seconds
    this.syncId = setInterval(() => {
      this.updateTweets(this.props.loggedInUser);
      this.updateHashtags();
    }, 5000);

    const prompts = [
        'What\'s on your mind?',
        'Share your thoughts',
        'Say it loud. Say it proud.',
        'Got something to say?',
        'Don\'t keep it to yourself!',
        'Say something...'
    ];

    const prompt = prompts[Math.floor(Math.random() * prompts.length)]
    store.dispatch(changePrompt(prompt));
  }

  componentWillUnmount() {
    clearInterval(this.syncId);
  }

  componentWillReceiveProps(nextProps) {

    // If the logged in user changes, the tweets displayed
    // will change to tweets specific to the new user
    if (this.props.loggedInUser !== nextProps.loggedInUser) {
      this.updateTweets(nextProps.loggedInUser);
    }
  }

  /**
   * Updates tweets array based on tweets received from route
   * If no route specified, will gather latest tweets or tweets
   * Followed by logged in user
   */
  updateTweets(loggedInUser) {

    let tweetsRoute;

    if (loggedInUser) {
      tweetsRoute = `api/tweets/follower/${loggedInUser.id}/0/5`;
    } else {
      tweetsRoute = `api/tweets/latest/0/5`;
    }

    axios.get(tweetsRoute)
    .then(res => res.data)
    .then(tweets => {
      tweets.forEach((tweet) => {
        tweet.animate = true;
      });
      this.setState({tweets});
    })
    .catch(console.error);
  }

  updateHashtags() {
    axios.get(`/api/tweets/hashtags/popular/0/10/`)
    .then(res => res.data)
    .then(hashtags => {
      hashtags.forEach((hashtag) => {
        hashtag.animate = true;
      });
      this.setState({hashtags})}
    )
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <div className='row'>
          
          <div className='col-sm-4 col-xs-12 text-center'>
            
            {/* SIGNED IN */}
            {this.props.loggedInUser && 
              (
                <div className='fade-in-slide-up-fast'>
                  <h1>Hello, {this.props.loggedInUser.firstname}</h1>
                  <br />
                  <Avatar url='https://unsplash.it/250/250/?random'/>
                  <br /><br /><br />
                </div>
              )
            }

              
            {/*NOT SIGNED IN*/}
            {!this.props.loggedInUser &&
             !this.props.isSignupDisplaying && 
             <Intro />
            }

            {/*CREATING ACCOUNT*/}
            {!this.props.loggedInUser &&
              this.props.isSignupDisplaying &&
              <Signup/>
            }

            <TweetField prompt={this.props.prompt}/>
          </div>
          
          <div className='col-sm-4 col-xs-12'>
            {this.state.tweets.length ?
            <TweetList
              tweets={this.state.tweets}
              header={"Latest Tweets"}
            />
            : (
              <div className='text-center'>
                <h2>No Tweets to Display :(</h2>
                <br /><br />
                <h4>Follow users to see their tweets!</h4>
                <br /><br />
                <input 
                  className='input-field'
                  style={ {width: '75%'} }
                  placeholder="Look for users and hashtags"
                />
                <br /><br />
              </div>
            )
            }
            
          </div>

          <div className='col-sm-4 hidden-xs'>
            <h1 className='text-center'>#Trending</h1>
            <br />
            <ul className='no-bullets col-sm-offset-3'>
              {this.state.hashtags && this.state.hashtags.map((hashtagData, index) => {
                let classNameString = '';
                if(hashtagData.animate) {classNameString += ' fade-in-slide-up-faster';}
                return (
                  <li key={index} className={classNameString}>
                    <Link to={`/tweets/related/${hashtagData.hashTag.replace(/#/, '')}`}>
                      {hashtagData.hashTag}
                    </Link>
                  </li>);
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;