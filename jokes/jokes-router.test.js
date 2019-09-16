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
      console.log(res.error)
      done()
    })
})

describe('GET /jokes', () => {

  it('should respond with 200', () => {
    return request(server)
      .get('/api/jokes')
      .set({authorization: `${token}`})
      .then(res => {
        console.log(res.error)
        expect(res.status).toBe(200)
      })
  })

  it('should respond with 401 unauthorized', () => {
    return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.status).toBe(401)
      })
  })
})