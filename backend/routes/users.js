const router = require('express').Router();
const { getUsers, getUserById, getCurrentUser, updateUserAvatar, updateUser } = require('../controllers/users');

router.get('/', getUsers);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUser);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);


module.exports = router
