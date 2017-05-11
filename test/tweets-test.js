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

    it('Should return an empty array, as there are no tweets, yet', () => {
      return req.get('/api/tweets/all')
        .expect([])
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

