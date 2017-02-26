'use strict'

const router = require('express').Router();
const User = require('../models/User');

/**
 * GET USER INFO
 */
router.get('/info/:username', (req, res) => {
  res.send("User GET not set up, yet");
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
    if(user) {
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
    if(user){
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
  res.send("User POST for tweets not set up, yet");
});

/**
 * RETRIEVE CURRENT LOGGED IN USER
 */
router.get('/current-user', (req, res) => {
  
  if(req.session.userId) {
    User.findById(req.session.userId)
    .then(user => {res.json(user);}
    )
    .catch(console.error)
  } else {
    res.json(null);
  }
});

module.exports = router;