const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../database/dbConfig.js')

// endpoints start with /api/auth

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  db('users').insert(user)
    .then(ids => {
      const id = ids[0]

      db('users').where({ id }).first()
        .then(saved => {
          const token = generateToken(saved)

          res.status(201).json({
            user: saved,
            token
          })
        })
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
      
});

router.post('/login', (req, res) => {
  // implement login
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;
