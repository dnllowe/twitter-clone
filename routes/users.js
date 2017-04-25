'use strict'

const router = require('express').Router()
const User = require('../models/User')

/**
 * GET ALL USERS
 */
router.get('/all', (req, res) => {
  User.findAll()
  .then(users => { res.json(users) })
  .catch(console.error)
});

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
      res.json(user)
    } else {
      res.json({error: `Whoops! Can't find @${req.params.username}`})
      throw new Error('User not found in database')
    }
  })
  .catch(console.error)
})

/**
 * LOGIN USER
 */
router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  let user = null

  User.findOne({
    where: { username }
  })
  .then(foundUser => {
    user = foundUser;
    if (user) { return user.checkPassword(password) }
  })
  .then(isPasswordValid => {
    // Could be null (if no user found) or false
    if (isPasswordValid) {
      req.session.userId = user.id
      res.json(user)
    } else {
      res.json({ error: 'LOGIN FAILED' })
    }
  })
  .catch(console.error)
})

/**
 * LOGOUT USER
 */
router.delete('/logout', (req, res) => {
  delete req.session.userId
  res.sendStatus(204)
})


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
      res.json({error: 'USERNAME ALEADY EXISTS'})
      throw new Error('USERNAME ALREADY EXISTS')
    } else {
      return User.create(req.body)
    }
  })
  .then(newUser => {
    // Create new user and set them as session id
    req.session.userId = newUser.id
    res.status(201).json(newUser)
  })
  .catch(console.error)
})

/**
 * UPDATE USER INFO
 */
router.put('/', (req, res) => {
  res.send('User POST not set up, yet')
})

/**
 * RETRIEVE CURRENT LOGGED IN USER
 */
router.get('/current-user', (req, res) => {

  if (req.session.userId) {
    User.findById(req.session.userId)
    .then(user => { res.json(user) }
    )
    .catch(console.error)
  } else {
    res.json(null)
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
    res.json(followers)
  })
  .catch(console.error)
})

/**
 * Retrieve all users that a user is following
 */
router.get('/:id/following', (req, res) => {
   User.findById(req.params.id)
  .then(user => {
    return user.getSubscriptions();
  })
  .then(subscriptions => {
    res.json(subscriptions)
  })
  .catch(console.error)
})

/**
 * Set a user to follow another user
 */
router.put('/:userId/follow/:followedUsername', (req, res) => {

  let updatedUser = null
  let followedUser = null
  let followId = null

  return User.findOne({
    where: {
      username: req.params.followedUsername
    }
  })
  .then(foundUser => {
    followedUser = foundUser
    followId = followedUser.id
    return User.findById(req.params.userId)
  })
  .then(user => {
    user.addSubscription(followId)
    followedUser.addFollower(req.params.userId)
    updatedUser = user
    res.json(updatedUser).status(204)
  })
  .catch(console.error)
})

/**
 * Stop user from following another user
 */
router.put('/:userId/unfollow/:followedUsername', (req, res) => {

  let updatedUser = null
  let followedUser = null
  let followId = null

  return User.findOne({
    where: {
      username: req.params.followedUsername
    }
  })
  .then(foundUser => {
    followedUser = foundUser
    followId = followedUser.id
    return User.findById(req.params.userId)
  })
  .then(user => {
    user.removeSubscription(followId)
    updatedUser = user
    followedUser.removeFollower(req.params.userId)
    res.json(updatedUser).status(204)
  })
  .catch(console.error)
})


module.exports = router
