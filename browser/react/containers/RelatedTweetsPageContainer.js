'use strict'
import React from 'react'
import axios from 'axios';

import RelatedTweetsPage from '../components/RelatedTweetsPage';

class RelatedTweetsPageContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      tweets: []
    }
  }

  componentDidMount() {
    axios.get(`/api/tweets/related/${this.props.params.hashTag}`)
    .then(res => res.data)
    .then(tweets => this.setState({tweets}))
    .catch(console.error);
  }

  render() {
    return (
      <RelatedTweetsPage 
        tweets={this.state.tweets}
        hashTag={this.props.params.hashTag}/>
    );
  }
}

export default RelatedTweetsPageContainer;