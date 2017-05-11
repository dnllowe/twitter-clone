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

  describe('GET /all', () => {

    it('Should return an empty array, as there are no tweets, yet', () => {
      return req.get('/api/tweets/all')
        .expect([])
    })
  })
})

