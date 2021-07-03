const request = require('supertest')

const server = require('../api/server.js')
const db = require('../database/dbConfig.js')
const jwt = require('jsonwebtoken')


describe('POST /register', () => {
  
  it('should register a new user, status 201', done => {
    request(server)
      .post('/api/auth/register')
      .send({
        username: 'TF',
        password: 'pass'
      })
      .then((res) => {
        console.log(res.error)
        expect(res.status).toBe(201)
        done()
      })
  })
})