const express = require("express");
const helmet = require("helmet")
const authenticator = require("../middleware/authenticator")
const Hirez = require('hirez-api');
const creds = require('./secrets');
const cors = require('cors');
const usersRouter = require("../users/users-router.js")
const authRouter = require("../auth/auth-router.js")
const server = express();

function getByName(name) {
    return db("users").where({ name }).first();
  }

server.use(cors());
server.use(helmet())
server.use(express.json());



global.api = new Hirez.Smite({
    platform: "PC",
    devId: creds. devId,
    authKey: creds.authKey,
})

server.get("/gods", (req, res) => {
 
      api.getGods()
      .then(gods => {
          res.status(200).json(gods)
      })

});

server.get("/items", (req, res) => {
 
  api.getItems()
  .then(items => {
   
      res.json(items)
  })

});

server.get("/gods/:id", (req,res) => {
  api.getGods()
      .then(gods => {
        const godlist = gods.filter(god => god.Name.toLowerCase().toString().split(" ").join("") === req.params.id)[0];

        res.status(200).json(godlist);
      })
})
server.use('/api/auth', authRouter)
server.use('/api/users', authenticator, usersRouter)


    
  
  module.exports = server;
  