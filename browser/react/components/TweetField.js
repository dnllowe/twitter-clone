import React from 'react';

/// NEEDS TO SUBSCRIBE TO STORE TO SEE WHEN CURRENT LOGGED IN USER CHANGES

import store from '../../redux/store';
import addTweet from '../../redux/action-creators/addTweet';

class TweetField extends React.Component {
   
  constructor(props) {
    super();
    this.state = {input: ''}
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    this.setState({input: event.target.value});
  }

  submitTweet(event) {
    event.preventDefault();
    const reqBody = {tweet: this.state.input}
    store.dispatch(addTweet(reqBody));
    this.setState({input: ''});
  }

  render() {

    return (
      <form method='POST'>
        <span>
          <input 
            name='tweetContent' 
            className='input-field' 
            placeholder={this.props.prompt} 
            onChange={this.updateInput}
            value={this.state.input}
          />
        </span>
        <span className='margin-left-smaller'>
          <button 
            type='submit' 
            className='button-primary-small margin-bottom-med' 
            onClick={(event) => this.submitTweet(event)}>
            Tweet
          </button>
        </span>
      </form>
    );
  }
}

export default TweetField;