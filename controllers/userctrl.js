require('dotenv').config();
const saltRounds = Number(process.env.SALT_ROUNDS);

var bcrypt = require('bcrypt');

var User = require('../models/user');

var create = function(req, res) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, createdUser) => {
    res.send(err ? err : createdUser);
  })
}

var get = function(req, res) {
  User.find(function (err, users) {
    res.send(err ? err : users)
  });
}

var getOne = function(req, res) {
  User.find({_id: req.params.id}, (err, user) => {
    res.send(err ? err: user)
  })
}

var update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true }, (err, user) => {
    if(err) res.send(err.errors)
    User.findById(user._id, (err, user) => {
      res.send(user)
    })
  })
}

var remove = function(req, res) {
  User.findOneAndRemove({_id: req.params.id}, (err, user) => {
    if(err) res.send(err)
    res.send(user)
  })
}

module.exports = {
  create, get, getOne, update, remove
};