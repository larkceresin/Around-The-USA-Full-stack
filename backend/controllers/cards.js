const Card = require('../models/Card');
const ValidationError = require('../middleware/errors/ValidationError');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ForbiddenError = require('../middleware/errors/ForbiddenError')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => {
      res.send({ data: cards })
    })
    .catch(() => res.status(500).send({ message: 'Error' }))
}
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => {
      if (!card) {
        throw new ValidationError('invalid data passed to the methods for creating a card')
      }
      res.send( card)
    })
    .catch(next)
}
module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(card => {
      if (String(card.owner) !== req.user._id) {
        throw new ForbiddenError('User is not authorized for this method')
      }
      if (card === null) { throw new NotFoundError('card not found') }
      res.send({message:'card deleted'})
    })
    .catch(next)
}
module.exports.addLike = (req, res, next) => {
  let user = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.likes.includes(user)) {
        throw new ValidationError("Already Liked")
      }
      Card.findByIdAndUpdate(card._id,
        { $addToSet: { 'likes': user } }, { new: true, runValidators: true })
        .then(card => res.send(card))
    })
    .catch(next)
}
module.exports.removeLike = (req, res, next) => {
  let user = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.likes.includes(user)) {
        throw new ValidationError("Not liked")
      }
      Card.findByIdAndUpdate(card._id,
        { $pull: { 'likes': user } },
        { new: true })
        .then(card => res.send(card))
    })
    .catch(next)
}
