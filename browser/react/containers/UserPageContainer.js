'use strict';
import React from 'react';

import store from '../../redux/store';
import selectUser from '../../redux/action-creators/selectUser';

import UserPage from '../components/UserPage';

class UserPageContainer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      userHandle: props.params.handle,
      tweets: null,
      error: null
    }
  }

  componentDidMount() {
    store.dispatch(selectUser(this.props.params.handle))
    .then(potentialError => {
      if(potentialError) {
        this.setState({error: potentialError});
      }
    })
    .catch(console.error);
  }

  render() {
    console.log(this.props.selectedUser);
    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.props.selectedUser && 
        <UserPage user={this.props.selectedUser}/>
        }
      </div>
    );
  }
}

export default UserPageContainer;