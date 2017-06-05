var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Article's title can't be empty!"],
      minlength: [2, 'Article\'s title is too short!']
    },
    username: String,
    email: String,
    password: String
});

var User  = mongoose.model('User', userSchema);

module.exports = User;