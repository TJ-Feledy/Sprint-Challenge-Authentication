const request = require('supertest')

const server = require('../api/server.js')

let token

beforeAll((done) => {
  request(server)
    .post('/api/auth/login')
    .send({
      username: 'TJF',
      password: 'pass'
    })
    .end((err, res) => {
      token = res.body.token        
      console.log(res.body)
      done()
    })
})

describe('GET /jokes', () => {

  xit('should respond with 200', () => {
    return request(server)
      .get('/api/jokes')
      .set({authorization: `${token}`})
      .then(res => {
        expect(res.status).toBe(200)
      })
  })

  it('should respond with 400 no token provided', () => {
    return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.status).toBe(400)
      })
  })
})