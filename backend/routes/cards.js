const router = require('express').Router();
const { getCards, createCard, deleteCard, addLike, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/likes/:cardId', addLike);
router.delete('/likes/:cardId', removeLike)
module.exports = router
