import React from 'react';
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

  componentDidMount() {

    // Check for new tweets and hashtags every 5 seconds
    this.syncId = setInterval(() => {
      store.dispatch(loadTweets('/api/tweets/latest/0/5'));
      store.dispatch(loadHashtags('/api/tweets/hashtags/popular/0/10'));
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

  render() {
    return (
      <div>
        <div className='row'>
          
          <div className='col-sm-5 col-xs-12 text-center'>
            
            {/* SIGNED IN */}
            {this.props.loggedInUser && 
              (
                <div>
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
            <TweetList
              tweets={this.props.currentTweets}
              header={"Latest Tweets"}
            />
          </div>

          <div className='col-sm-3 hidden-xs'>
            <h1>#Trending</h1>
            <br />
            <ul className='no-bullets'>
              {this.props.currentHashtags && this.props.currentHashtags.map((hashtagData, index) => {
                return (
                  <li key={index}>
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