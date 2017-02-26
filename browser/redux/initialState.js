'use strict'

export default {

  tweets: {
    currentTweets: [],
    selectedTweet: null,
    currentHashtags: []
  },
  ui: {
    navigationLinks: ['Home', 'Tweets', 'Users', 'FAQ'],
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