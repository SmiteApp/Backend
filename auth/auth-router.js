const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Auth = require("../auth/auth-model.js")
const secrets = require("../api/secrets.js")

router.get('/', (req, res) => {
  Auth.getAll()
    .then(users => {
      res.status(200).json({users})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
})

router.post('/register', (req, res) => {
  let user = req.body
  const rounds = process.env.HASH_ROUNDS || 6
  const hash = bcrypt.hashSync(user.password, rounds)
  
  user.password = hash


  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });

});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "credentials incorrect" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1m",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
