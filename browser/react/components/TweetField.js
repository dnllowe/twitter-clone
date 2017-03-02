import React from 'react';

/// NEEDS TO SUBSCRIBE TO STORE TO SEE WHEN CURRENT LOGGED IN USER CHANGES

import store from '../../redux/store';
import addTweet from '../../redux/action-creators/addTweet';

class TweetField extends React.Component {
   
  constructor(props) {
    super();
    this.state = {
      input: '',
      error: null}

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    if(this.state.error) {
      this.setState({error: null})
    }
    this.setState({input: event.target.value});
  }

  submitTweet(event) {
    event.preventDefault();

    if(this.state.input === '') {
      this.setState({error: `Don't be shy! :)`})
    } else {
      const reqBody = {tweet: this.state.input}
      store.dispatch(addTweet(reqBody));
      this.setState({input: ''});
    }
  }

  render() {

    return (
      <div>

        {/*ERROR MESSAGE*/}
        {this.state.error && 
        <div>
          <strong>{this.state.error}</strong>
          <br/><br/>
        </div> 
        }

        {/*FORM*/}
        <form method='POST'>
          <span>
            <input 
              name='tweetContent' 
              className='input-field'
              style={ {width: '50%'} } 
              placeholder={this.props.prompt} 
              onChange={this.updateInput}
              value={this.state.input}
            />
          </span>

          {/*SUBMIT*/}
          <span className='margin-left-smaller'>
            <button 
              type='submit' 
              className='button-primary-small margin-bottom-med' 
              onClick={(event) => this.submitTweet(event)}>
              Tweet
            </button>
          </span>
        </form>
      </div>
    );
  }
}

export default TweetField;