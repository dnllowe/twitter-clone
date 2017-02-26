'use strict'

export default {

  tweets: {
    currentTweets: [],
    selectedTweet: null,
    currentHashtags: []
  },
  ui: {
    navigationLinks: [
      {text: 'Home', url: '/', callbacks: []}, 
      {text: 'Tweets', url: '/', callbacks: []}, 
      {text: 'Users', url: '/', callbacks: []}, 
      {text: 'FAQ', url: '/', callbacks: []}
    ],
    prompt: 'What\'s on your mind?',
    isSignupDisplaying: false
  },
  input: {
    username: '',
    password: ''
  },
  user: {
    selectedUser: null,
    loggedInUser: null
  }
}