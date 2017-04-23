'use strict'
import React from 'react';
import axios from 'axios';

import store from '../../redux/store';
import displaySignup from '../../redux/action-creators/displaySignup';
import updatePassword from '../../redux/action-creators/updatePasswordInput';
import updateUsername from '../../redux/action-creators/updateUsernameInput';
import login from '../../redux/action-creators/loginUser';
import fetchSubscriptions from '../../redux/action-creators/setSubscriptions'

class UserForm extends React.Component {

  constructor() {
    super();

    this.state = store.getState().input;
    this.state.error = null;

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleUsernameInput(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value});
  }

  handleLogin(event) {
    event.preventDefault();
    store.dispatch(updatePassword(this.state.password));
    store.dispatch(updateUsername(this.state.username));

    // Check for any potential errors returned from the promise
    store.dispatch(login())
    .then(potentialError => {
      if (potentialError) {
        this.setState({ error: potentialError });
      } else {
        console.log('ABOUT TO FETCH HIS SUBSCRIPTIONS', store.getState().user.loggedInUser)
        store.dispatch(fetchSubscriptions(store.getState().user.loggedInUser.id))
      }
    })
      .catch(console.error);
  }

  handleSignup(event) {
    event.preventDefault();
    store.dispatch(updatePassword(this.state.password));
    store.dispatch(updateUsername(this.state.username));
    store.dispatch(displaySignup(true));
  }

  render() {
    return (
      <form onChange={() => {this.setState({error: null})}}>

        {/*ERROR MESSAGE IF LOGIN FAILED*/}
        {this.state.error &&
        (<div className='text-error'>
          {this.state.error}
          <br/><br/>
         </div>
        )}

        {/*USERNAME INPUT*/}
        <input
          className='input-field margin-bottom-small'
          type='text'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleUsernameInput}
        />
        <br/>

        {/*PASSWORD INPUT*/}
        <input
          className='input-field margin-bottom-small'
          type='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handlePasswordInput}
        />
        <br/><br/>

        {/*LOGIN BUTTON*/}
        <button
          className='button-primary margin-right-smallest margin-bottom-smaller'
          onClick={this.handleLogin}>
          LOGIN
        </button>

        {/*SIGN UP BUTTON*/}
        <button
          className='button-primary'
          onClick={this.handleSignup}>
          SIGN UP
        </button>
      </form>
    );
  }
}

export default UserForm;