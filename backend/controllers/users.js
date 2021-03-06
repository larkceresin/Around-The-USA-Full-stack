const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ValidationError = require('../middleware/errors/ValidationError');
const isEmail = require('validator/lib/isEmail')
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(next)
}
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      res.send({ data: user })
    })
    .catch(next)
};
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      res.send(user)
    })
    .catch(next)
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!isEmail(email)) {
    throw new ValidationError('Incorrect Email or Password')
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ValidationError('Incorrect Email or Password')
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true
      })
      res.send({ 'token': token })
    })
    .catch(next);
};

module.exports.updateUserName = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { "name": name }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      res.send({ data: user })
    })
    .catch(next)
}
module.exports.updateUserAbout = (req, res, next) => {
  const { about } = req.body;
  User.findByIdAndUpdate(user._id, { "about": about }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      res.send({ data: user })
    })
    .catch(next)
}
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { 'avatar': avatar }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      res.send({ data: user })
    })
    .catch(next)
}

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  if (!isEmail(email)) {
    throw new ValidationError('invalid data passed to the methods for creating a user')
  };

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        .then(user => {
          if (!user) {
            throw new ValidationError('invalid data passed to the methods for creating a user')
          } res.status(201).send({
            _id: user._id,
            email: user.email
          })
        })
        .catch(next)
    })
    .catch(next)
}
