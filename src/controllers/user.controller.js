const userRepo = require("../repositories/user.repository.js");

// Create and Save a new User

module.exports.createUser = (req, res) => {
  userRepo.createUser(req.body)
    .then((user) => {
      var userData = JSON.stringify(user)
      console.log(JSON.parse(userData).insertId)
      if(Object.keys(req.body.address).length !== 0){
        userRepo.createAddress(req.body.address, JSON.parse(userData).insertId)
        .then((data) => {
          console.log("Address response: ", data);
          res.send(data);
        }).catch((err) => {
          res.send(err)
        }); 
      } else     
        res.send(user)
    }).catch((err) => {
      res.send(err)
    });
}

module.exports.findById = (req, res) => {
  userRepo.findById(req.params.id)
    .then((user) => {

      res.send(user)
    }).catch((err) => {
      res.send(err)
    });
}

module.exports.getAllUsers = (req, res) => {
  userRepo.getAllUsers()
  .then((data) => {
      res.send(data)
  }).catch((err) => {
    res.send(err)
  });
}

module.exports.updateUserById = (req, res) => {
  userRepo.updateUserById(req.body,req.params.userId)
  .then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  });
}

module.exports.deleteUser = (req, res) => {
  userRepo.deleteUser(req.params.userId)
  .then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  });
}

