const express = require('express')
const user = require('../controllers/user.controller.js');

const router = express.Router();

  // Create a new User
  router.post("/user", user.createUser);

  // Retrieve all Users
  router.get("/users", user.getAllUsers);

  // Retrieve a single user with userId
  router.get("/users/:id", user.findById);

  // Update a user with userId
  router.put("/users/:userId", user.updateUserById);

  // Delete a user with userId
  router.delete("/users/:userId", user.deleteUser);



module.exports = router;