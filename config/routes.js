const axios = require('axios');
const router = require('express').Router(); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./routes-model.js');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  return jwt.sign({
    userId: user.id
  }, 'lambda secret', {
    expiresIn: '1h'
  })
}

async function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const newUser = await Users.add(user);
    const token = generateToken(newUser);
    res.status(201).json({newUser, token});
  } catch {
    res.status(500).json({error: "Error during registration"})
  }
}

async function login(req, res) {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({username});

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome ${user.username}, you are logged in!`,
        authToken: token,
      })
    } else {
      res.status(401).json({ message: "Invalid Credentials" })
    }
  } catch {
    res.status(500).json({ error: "Error logging in" })
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
