'use strict'

const app = require('../server').app
const req = require('supertest')(app)
const expect = require('chai').expect
const { db, User, Tweet } = require('../models')

describe('Synce the database', () => {

  it('Should sync successfully', () => {
    return db.sync({ force: true })
      .catch(console.error)
  })
})

describe('Starting Supertest Server', () => {

  it('Should start server and respond with code 200', () => {
    return req.get('/')
      .expect(200)
  })
})

describe('/api/tweets', () => {

  // Deleted and created new before each test
  let testUser = null

  // Create a test user, cache user, and log them out
  beforeEach(() => {
    return db.sync({ force: true })
      .then(() => {
      return req.post('/api/users')
        .send({
          firstname: 'Test',
          lastname: 'User',
          username: 'test_user',
          password: '123'
        })
        .expect(201)
        .then(newUser => {
          testUser = newUser.body
          return req.delete('/api/users/logout')
        })
    })
      .catch(console.error)
  })

  describe('GET /all', () => {

    // Use to store tweets in subsequent calls / tests
    let tweets = null

    it('Should return an empty array, as there are no tweets, yet', () => {
      return req.get('/api/tweets/all')
        .expect([])
    })

    it('Should return an array of tweets that exist', () => {
      return req.post('/api/tweets')
        .send({ tweet: "Here's a test tweet. #one" })
        .expect(201)
        .then(() => {
          return req.post('/api/tweets')
            .send({ tweet: "Another test tweet. #two #again" })
            .expect(201)
        })
        .then(() => {
          return req.post('/api/tweets')
            .send({ tweet: "Final test tweet. #three #last" })
            .expect(201)
        })
        .then(() => {
          return req.get('/api/tweets/all')
            .expect(200)
            .then(res => {
              tweets = res.body
              expect(tweets.length).to.equal(3)
            })
        })
    })

    it('Should return tweets in order of most recently created', () => {
      expect(tweets[2].content).to.equal("Here's a test tweet. #one")
      expect(tweets[2].hashTags).to.eql(['#one'])
      expect(tweets[1].content).to.equal("Another test tweet. #two #again")
      expect(tweets[1].hashTags).to.eql(['#two', '#again'])
      expect(tweets[0].content).to.equal("Final test tweet. #three #last")
      expect(tweets[0].hashTags).to.eql(['#three', '#last'])
    })
  })

  describe('POST /', () => {

    it('Should create a new tweet and a new user for the tweet if no user is logged in)', () => {

      return req.post('/api/tweets')
        .send({ tweet: '1. Test Tweet #test #tweet' })
        .expect(201)
        .then(res => {
          const tweet = res.body
          expect(tweet.content).to.equal('1. Test Tweet #test #tweet')
          expect(tweet.user).to.not.equal(null)
          expect(tweet.user.fullname).to.equal('Anonymous Tweet')
          expect(tweet.hashTags).to.eql(['#test', '#tweet'])
        })
    })

    it('Should associate a new tweet with the currently logged in user', () => {
      return req.post('/api/users/login')
        .send(testUser)
        .expect(201)
        .then(() => {
          return req.post('/api/tweets')
            .send({ tweet: '2. Test Tweet With User #logged #in' })
            .expect(201)
        })
        .then(res => {
          const tweet = res.body
          expect(tweet.content).to.equal('2. Test Tweet With User #logged #in')
          expect(tweet.user).to.not.equal(null)
          expect(tweet.user.fullname).to.equal('Test User')
          expect(tweet.hashTags).to.eql(['#logged', '#in'])
        })
    })
  })
})

