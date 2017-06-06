require('dotenv').config();
const sec = process.env.TOKEN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp)

var should = chai.should();

var server = require('../app')
var User = require('../models/user');

describe('Authentication API test', () => {
  afterEach(done => {
    User.remove({}, (err, res) => {
      done()
    })
  })

  beforeEach(done => {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync('budi123', salt);

    var newUser = new User({
      name: "Budi Sudarsono",
      username: "budidarso",
      email: "budi@gmail.com",
      password: hash
    })
    newUser.save((err, saved) => {
      if(err) {
        console.log(err)
      } else {
        done()
      }
    })
  })

  describe('POST /api/users/login', () => {
    it('should return token for the logged in user', function(done) {
      chai.request(server)
      .post('/api/users/login')
      .send({
        username: "budidarso",
        password: "budi123"
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.have.property('token')
        done()
      })
    })

    it('should return error for incorrect password', function(done) {
      chai.request(server)
      .post('/api/users/login')
      .send({
        username: "budidarso",
        password: "budi"
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.have.property('msg', 'Incorrect password')
        done()
      })
    })

    it('should return error for unregistered user', function(done) {
      chai.request(server)
      .post('/api/users/login')
      .send({
        username: "anto",
        password: "budi"
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.have.property('msg', 'No such user')
        done()
      })
    })
  })
})