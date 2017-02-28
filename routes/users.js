'use strict';

const router = require('express').Router();
const User = require('../models/User');

/**
 * GET USER INFO
 */
router.get('/info/:username', (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    }
  })
  .then(user => {
    if (user){
      res.json(user);
    } else {
      res.json({error: `Whoops! Can't find @${req.params.username}`});
      throw new Error('User not found in database');
    }
  })
  .catch(console.error);
});

/**
 * LOGIN USER
 */
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    where: {username, password}
  })
  .then(user => {
    if (user) {
      req.session.userId = user.id;
      res.json(user);
    }
    else { res.json({error: 'LOGIN FAILED'});}
  })
  .catch(console.error);
});

/**
 * LOGOUT USER
 */
router.delete('/logout', (req, res) => {
  delete req.session.userId;
  res.sendStatus(204);
});


/**
 * CREATE NEW USER
 */
router.post('/', (req, res) => {

  // Make sure username doesn't already exist
  User.findOne({
    where: {username: req.body.username}
  })
  .then(user => {
    if (user) {
      res.json({error: 'USERNAME ALEADY EXISTS'});
      throw new Error('USERNAME ALREADY EXISTS');
    } else {
      return User.create(req.body);
    }
  })
  .then(newUser => {
    // Create new user and set them as session id
    req.session.userId = newUser.id;
    res.status(201).json(newUser);
  })
  .catch(console.error);
});

/**
 * UPDATE USER INFO
 */
router.put('/', (req, res) => {
  res.send('User POST for tweets not set up, yet');
});

/**
 * RETRIEVE CURRENT LOGGED IN USER
 */
router.get('/current-user', (req, res) => {

  if (req.session.userId) {
    User.findById(req.session.userId)
    .then(user => {res.json(user);}
    )
    .catch(console.error);
  } else {
    res.json(null);
  }
});

/**
 * Retrieve all followers for a given user
 */
router.get('/:id/followers', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    return user.getFollowers();
  })
  .then(followers => {
    res.json(followers);
  })
  .catch(console.error);
});

/**
 * Retrieve all users that a user is following
 */
router.get('/:id/following', (req, res) => {
   User.findById(req.params.id)
  .then(user => {
    return user.getSubscriptions();
  })
  .then(subscriptions => {
    res.json(subscriptions);
  })
  .catch(console.error);
});

/**
 * Set a user to follow another user
 */
router.put('/:userId/following/:followId', (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    user.addSubscription(req.params.followId);
    return User.findById(req.params.followId);
  })
  .then(followedUser => {
    followedUser.addFollower(req.params.userId);
    res.sendStatus(204);
  })
  .catch(console.error);
});

/**
 * Stop user from following another user
 */
router.delete('/:userId/following/:followId', (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    user.removeSubscription(req.params.followId);
    return User.findById(req.params.followId);
  })
  .then(followedUser => {
    followedUser.removeFollower(req.params.userId);
    res.sendStatus(204);
  })
  .catch(console.error);
});


module.exports = router;
