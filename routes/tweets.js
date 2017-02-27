'use strict'

const router = require('express').Router();
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const sequelize = require('sequelize');


/**
 * GET ALL TWEETS
 */
router.get('/all', (req, res) => {
  
  Tweet.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {model: User, as: 'user'}
    ]
  })
  .then((tweets) => {
    res.json(tweets);
  })
  .catch(console.error);
});



/**
 * GET SPECIFIC TWEET BY id
 * @param {INTEGER} id is the tweet's id in the database
 */
router.get('/tweet/:id', (req, res) => {
    
  Tweet.findOne({
    where: {id: req.params.id},
    include: [{model: User, as: 'user'}]
  })
  .then((tweet) => {
    res.json(tweet);
  })
  .catch(console.error);
});



/**
 * GET LATEST TWEETS
 * @param {Number} limit is the amount of tweets to return
 */
router.get('/latest/:time/:limit', (req, res) => {

  let query = {
    order: [['createdAt', 'DESC']],
    where: {
      createdAt: {
        $gt: req.params.time
      }
    },
    include: [{model: User, as: 'user'}]
  }

  // Only limit if sent a value greater than 0 in route
  if(req.params.limit > 0) {query.limit = req.params.limit;}

  Tweet.findAll(query)
  .then((orderedTweets) => {
      res.json(orderedTweets);
  })
  .catch(console.error)
});


/**
 * GET ALL TWEETS BY A SPECIFIC USER
 */
router.get('/user/:username', (req, res) => {
  
  User.findOne({
    where: {
      username: req.params.username
    }
  })
  .then(user => {
    if(!user){
      res.json({error: 'User does not exist'})
    } else {
      return Tweet.findAll({
        include: [{model: User, as: 'user'}],
        where: {
          userId: user.id
        }
      })
    }
  })
  .then(tweets => {
    res.json(tweets);
  })
  .catch(console.error);
})

/**
 * RETURNS ALL TWEETS WITH HASH TAG 
 */
router.get('/related/:hashTag', (req, res) => {
  
  // # removed in request URL
  const hashTag = '#' + req.params.hashTag;

  Tweet.findAll({
    where: {
      hashTags: {
        $overlap: [hashTag]
      }
    },
    order: [['createdAt', 'DESC']],
    include: [{model: User, as: 'user'}]
  })
  .then(relatedTweets => {
    res.json(relatedTweets);
  })
  .catch(console.error);
});



/**
 * POST NEW TWEET
 * Tweet content, author, handle, and hashTags
 * included in req.body
 */
router.post('/', (req, res) => {

  const hashTags = req.body.tweet.split(' ')
  .filter((word) => word.charAt(0) === '#');

  let promise = null;

  // If no user is logged in, we will create a random one
  if(!req.session.userId) {

    let randomUser = {}
    const charLength = Math.floor(Math.random() * 10) + 5;
    let randomName = '';

    for(let iii = 0; iii < charLength; iii++) {  
      const randomChar = String.fromCharCode(Math.floor(Math.random() * 57) + 65);
      randomName += randomChar;
    }
    randomName = randomName.replace(/[^a-z0-9]/g, '_');

    promise = User.create({
      firstname: 'Anonymous',
      lastname: 'Tweet',
      username: randomName,
      password: 'password'
    })
  } else {
    promise = User.findById(req.session.userId);
  }

  promise.then(user => {
 
    //If user wasn't logged in before, store user in session now
    if(!req.session.userId) {req.session.userId = user.id;}
    
    return Tweet.create({
      content: req.body.tweet,
      hashTags,
      userId: user.id
    });
  })
  .then(newTweet => {
    return Tweet.findOne({
      where: {id: newTweet.id},
      include: [{model: User, as: 'user'}]
    })
  })
  .then(newTweetWithUser => {
    res.json(newTweetWithUser);
  })
  .catch(console.error);
});



/**
 * GET ALL HASHTAGS EVER USED
 */
router.get('/hashtags', (req, res) => {

  // Prioritize by total hashtag count and tweeted the latest
  Tweet.findAll({
    order: [['createdAt', 'DESC']],
    attributes: ['hashTags'],
    where: {
      hashTags: {
        $not: []
      }
    }  
  })
  .then(tweets => {
    // Use array to sort hashtags based on frequency
    let uniqueHashtags = [];

    tweets.forEach((tweet) => {
      tweet.hashTags.forEach((hashTag) => {    
        const index = uniqueHashtags.findIndex((element) => {
          return element.hashTag === hashTag;
        });
        if(index === -1) {uniqueHashtags.push({hashTag});}
      });
    });
    res.json(uniqueHashtags);
  })
  .catch(console.error);
});



/**
 * GET MOST COMMON HASHTAGS STARTING FROM SPECIFIC TIME
 */
router.get('/hashtags/popular/:time/:limit', (req, res) => {
  // Prioritize by total hashtag count and tweeted the latest

  let query = {
    order: [['createdAt', 'DESC']],
    attributes: ['hashTags'],
    where: {
      createdAt: {
        $gt: req.params.time
      },
      hashTags: {
        $not: []
      }
    }
  }

  Tweet.findAll(query)
  .then(tweets => {

    // Use array to sort hashtags based on frequency
    let uniqueHashtags = [];

    tweets.forEach((tweet) => {
      tweet.hashTags.forEach((hashTag) => {
        
        const index = uniqueHashtags.findIndex((element) => {
          return element.hashTag === hashTag;
        });

        if(index === -1) {
          uniqueHashtags.push({hashTag, frequency: 1});
        } else {        
          uniqueHashtags[index].frequency++;     
        }
      });
    });
    uniqueHashtags.sort((a, b) => {
      return b.frequency - a.frequency;
    });

    // Send all tweets if limit is sent as 0
    if(req.params.limit > 0) {
      res.json(uniqueHashtags.slice(0, req.params.limit));
    } else {
      res.json(uniqueHashtags);
    }
  })
  .catch(console.error);
});



/**
 * GET ALL HASHTAGS USED STARTING FROM SPECIFIC TIME
 */
// router.get('/hashtags/:time/:limit');

module.exports = router;