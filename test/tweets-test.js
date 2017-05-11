'use strict'

const app = require('../server')
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

  beforeEach(() => {
    return db.sync({ force: true })
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

    it('Should create a new tweet and a new user for the tweet (since no user is logged in)', () => {
      return req.post('/api/tweets')
        .send({
          tweet: '1. Test Tweet #test #tweet',
        })
        .expect(201)
        .then(res => {
          expect(res.body.content).to.equal('1. Test Tweet #test #tweet')
          expect(res.body.user).to.not.equal(null)
          expect(res.body.user.fullname).to.equal('Anonymous Tweet')
          expect(res.body.hashTags).to.eql(['#test', '#tweet'])
        })
    })
  })
})

