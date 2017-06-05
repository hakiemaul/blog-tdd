var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, "Article's title can't be empty!"],
      minlength: [2, 'Article\'s title is too short!']
    },
    author: String,
    article_content: String,
    createdAt: Date
});

var Article  = mongoose.model('Article', articleSchema);

module.exports = Article;