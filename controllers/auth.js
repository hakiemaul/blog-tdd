require('dotenv').config();
const sec = process.env.TOKEN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var login = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if(err) res.send(err);
    if(user) {
      bcrypt.compare(password, user.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: user._id, username: user.username, name: user.name }, sec);
          res.send({token: token})
        } else {
          res.send({ msg: 'Incorrect password' });
        }
      })
      .catch(err => console.log(err))
    } else res.send({ msg: 'No such user' })
  })
}

var signup = function(req, res, next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

module.exports = {
  login, signup
};
