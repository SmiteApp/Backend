const express = require('express');

const Users = require('./users-model');


const router = express.Router();


// get list of users
router.get('/', (req, res) => {
  Users.get()
  .then(Users => {
    res.json(Users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Users' });
  });
});


// Get user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Users.getById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get Users' });
    });
  });

  // add a new user
  router.post("/", (req, res) => {
    Users.add(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

// update user
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Users.getById(id)
    .then(user => {
      if (user) {
        Users.update(changes, id)
        .then(updatedUser => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update user' });
    });
  });


  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete user' });
    });
  });




module.exports = router;