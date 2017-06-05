var Article = require('../models/article');

var create = function(req, res) {
  let newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    article_content: req.body.article_content,
    createdAt: new Date()
  })
  newArticle.save((err, createdArticle) => {
    res.send(err ? err : createdArticle);
  })
}

var get = function(req, res) {
  Article.find(function (err, articles) {
    res.send(err ? err : articles)
  });
}

var getOne = function(req, res) {
  Article.find({_id: req.params.id}, (err, article) => {
    res.send(err ? err: article)
  })
}

var update = function(req, res) {
  Article.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true }, (err, article) => {
    if(err) res.send(err.errors)
    Article.findById(article._id, (err, article) => {
      res.send(article)
    })
  })
}

var remove = function(req, res) {
  Article.findOneAndRemove({_id: req.params.id}, (err, article) => {
    if(err) res.send(err)
    res.send(article)
  })
}

module.exports = {
  create, get, getOne, update, remove
};