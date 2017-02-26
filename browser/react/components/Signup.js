import React from 'react';
import axios from 'axios';

import store from '../../redux/store';
import displaySignup from '../../redux/action-creators/displaySignup';
import updateUsername from '../../redux/action-creators/updateUsernameInput';
import updatePassword from '../../redux/action-creators/updatePasswordInput';
import createUser from '../../redux/action-creators/createUser';

class Signup extends React.Component {

  constructor() {
    super();
    this.state = store.getState().input;
    this.state.firstname = '';
    this.state.lastname = '';
    this.state.stepOneComplete = false;
    
    this.state.error = {
      username: null,
      password: null,
      firstname: null,
      lastname: null
    }

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleFirstnameInput = this.handleFirstnameInput.bind(this);
    this.handleLastnameInput = this.handleLastnameInput.bind(this);
    this.submitStepOne = this.submitStepOne.bind(this);
    this.submitStepTwo = this.submitStepTwo.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        username: store.getState().input.username,
        password: store.getState().input.password});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    store.dispatch(displaySignup(false));
  }

  handleUsernameInput(event) {

    // Clear any previous errors when user changes username input
    if(this.state.error.username) {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {username: null});
        return {error: newErrorState}
      });
    }
    store.dispatch(updateUsername(event.target.value));
  }

  handlePasswordInput(event) {

    // Clear any previous errors when user changes password input
    if(this.state.error.password) {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {password: null});
        return {error: newErrorState}
      })
    }
    store.dispatch(updatePassword(event.target.value));
  }

  handleFirstnameInput(event) {

    // Clear any previous errors when user changes firstname input
    if(this.state.error.firstname) {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {firstname: null});
        return {error: newErrorState}
      })
    }
    this.setState({firstname: event.target.value});
  }

  handleLastnameInput(event) {

    // Clear any previous errors when user changes lastname input
    if(this.state.error.lastname) {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {lastname: null});
        return {error: newErrorState}
      })
    }

    this.setState({lastname: event.target.value});
  }

  submitStepOne(event) {
    
    event.preventDefault();

    // NO USERNAME ERROR
    if(this.state.username === '') {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {username: 'USERNAME REQUIRED'});
        return {error: newErrorState}
      });
    }

    // NO PASSWORD ERROR
    if(this.state.password === '') {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {password: 'PASSWORD REQUIRED'});
        return {error: newErrorState}
      })
    }

    // SUCCESSFUL FORM COMPLETION
    if(this.state.username !== '' && this.state.password !== '') {
      this.setState({stepOneComplete: true});
    }
  }

  submitStepTwo(event) {
    event.preventDefault();

    // NO FIRST NAME ERROR
    if(this.state.firstname === '') {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {firstname: 'FIRST NAME REQUIRED'});

          return {error: newErrorState}
      })
    }

    // NO LAST NAME ERROR
    if(this.state.lastname === '') {
      this.setState((prev, props) => {
        const newErrorState = Object.assign(
          {}, 
          prev.error, 
          {lastname: 'LAST NAME REQUIRED'});

          return {error: newErrorState}
      })
    }

    // SUCCESSFUL FORM COMPLETION
    if(this.state.firstname !== '' && this.state.lastname !== '') {

      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password
      }

      /**
       * createUser may return an error if the user already exists
       */
      store.dispatch(createUser(user))
      .then(potentialError => {
        if(potentialError) {
          this.setState((prev, props) => {
            const newErrorState = Object.assign(
              {}, 
              prev.error, 
              {username: potentialError});
            return {
              error: newErrorState, 
              stepOneComplete: false
            }
          });
        }
      })
      .catch(console.error);
    }
  }
  
 
  render() {
    
    // INPUT FIELD CLASS ARRAY
    let usernameClass = ['input-field'];
    let passwordClass = ['input-field'];
    let firstnameClass = ['input-field'];
    let lastnameClass = ['input-field'];
    
    // POTENTIAL ERROR MESSAGES
    const usernameError = this.state.error.username ? 
      (<h4><strong>*{this.state.error.username}</strong><br/></h4>)
      : null;

    const passwordError = this.state.error.password? 
      (<h4><strong>*{this.state.error.password}</strong><br/></h4>)
      : null;

    const firstnameError = this.state.error.firstname ? 
      (<h4><strong>*{this.state.error.firstname}</strong><br/></h4>)
      : null;

    const lastnameError = this.state.error.lastname ? 
      (<h4><strong>*{this.state.error.lastname}</strong><br/></h4>)
      : null;

    // ADD ERROR CLASS TO INPUT FIELDS IF ERRORS PRESENT
    if(usernameError) {usernameClass.push('error')}
    if(passwordError) {passwordClass.push('error')}
    if(firstnameError) {firstnameClass.push('error')}
    if(lastnameError) {lastnameClass.push('error')}

    return (
      
      <div className='sign-in-box fade-in-slide-up-faster'>

        {/*STEP ONE*/}
        {!this.state.stepOneComplete && 
          (
            <div>

              {/*HEADER*/}
              <div className='padding-smaller'>
                {usernameError || passwordError ? 
                  <div>
                    {usernameError}
                    {passwordError}
                  </div>
                 : <h3><strong>Sign up for Twitter Clone</strong></h3>
                } 
              </div>
              <form onSubmit={this.submitStepOne}>

                {/*USERNAME INPUT*/}
                <input
                  className={usernameClass.join(' ')}
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleUsernameInput} />
                <br />

                {/*PASSWORD INPUT*/}
                <input
                  className={passwordClass.join(' ')}
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handlePasswordInput} />
                <br />
                <br />

                {/*SUBMIT*/}
                <button type='submit' className='button-ternary-small'>NEXT</button>
              </form>
            </div>
          )
        }

        {/*STEP TWO*/}
        {this.state.stepOneComplete && 
          (
            <div>

              {/*HEADER*/}
              <div className='padding-smaller'>
                {firstnameError || lastnameError ?
                  <div>
                    {firstnameError}
                    {lastnameError}
                  </div>
                  : <h3><strong>Almost Done!</strong></h3>
                }
              </div>
              <form className='fade-in-faster' onSubmit={this.submitStepTwo}>

                {/*FIRSTNAME INPUT*/}
                <input
                  className={firstnameClass.join(' ')}
                  placeholder='Firstname'
                  value={this.state.firstname}
                  onChange={this.handleFirstnameInput} />
                <br />

                {/*LASTNAME INPUT*/}
                <input
                  className={lastnameClass.join(' ')}
                  placeholder='Lastname'
                  value={this.state.lastname}
                  onChange={this.handleLastnameInput} />
                <br />
                <br />

                {/*SUBMIT*/}
                <button className='button-ternary-small'>CREATE ACCOUNT</button>
              </form>
            </div>
          )
        }
      </div>
    );
  }
}

export default Signup;