var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp)

var should = chai.should();

var server = require('../app')
var Article = require('../models/article')

describe('Article API test', () => {
  afterEach(done => {
    Article.remove({}, (err, res) => {
      done()
    })
  })

  describe('GET /api/articles', () => {
    it('should get all article', function(done) {
      chai.request(server)
      .get('/api/articles')
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.have.lengthOf(0)
        done()
      })
    })
  })

  describe('POST /api/articles', () => {
    it('should create new article', function(done) {
      chai.request(server)
      .post('/api/articles')
      .send({
        author: "Budi Sudarsono",
        title: "Test article",
        article_content: "Lorem ipsum dolop dolop",
        createdAt: new Date()
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('author', "Budi Sudarsono")
        res.body.should.have.property('title', "Test article")
        res.body.should.have.property('article_content', "Lorem ipsum dolop dolop")
        done()
      })
    })

    it('should return error if title is empty', function(done) {
      chai.request(server)
      .post('/api/articles')
      .send({
        author: "Budi Sudarsono",
        article_content: "Lorem ipsum dolop dolop",
        createdAt: new Date()
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        done()
      })
    })

    it('should return error if title is too short', function(done) {
      chai.request(server)
      .post('/api/articles')
      .send({
        author: "Budi Sudarsono",
        title: "T",
        article_content: "Lorem ipsum dolop dolop",
        createdAt: new Date()
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        done()
      })
    })
  })

  describe('PUT /api/articles/:id', () => {
    var target;
    beforeEach(done => {
      var newArticle = new Article({
        author: "Budi Sudarsono",
        title: "Test article",
        article_content: "Lorem ipsum dolop dolop",
        createdAt: new Date()
      })
      newArticle.save((err, saved) => {
        if(err) {
          console.log(err)
        } else {
          target = saved._id;
          done()
        }
      })
    })
    it('should edit new article', function(done) {
      chai.request(server)
      .put(`/api/articles/${target}`)
      .send({
        author: "Budi Sudarsonois",
        title: "Test article edited",
        article_content: "Lorem ipsum dolop dolopss"
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('author', "Budi Sudarsonois")
        res.body.should.have.property('title', "Test article edited")
        res.body.should.have.property('article_content', "Lorem ipsum dolop dolopss")
        done()
      })
    })
  })

  describe('DELETE /api/articles/:id', () => {
    var target;
    beforeEach(done => {
      var newArticle = new Article({
        author: "Budi Sudarsono",
        title: "Test article",
        article_content: "Lorem ipsum dolop dolop",
        createdAt: new Date()
      })
      newArticle.save((err, saved) => {
        if(err) {
          console.log(err)
        } else {
          target = saved._id;
          done()
        }
      })
    })
    it('should delete the created article', function(done) {
      chai.request(server)
      .delete(`/api/articles/${target}`)
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
})