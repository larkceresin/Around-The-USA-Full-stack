const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    default: 'Jacque Cousteau',
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: /http(s?):\/\/[\w\-\/\.]{1,}\.(jpg|gif|png)/gi
  }
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model("User", userSchema);