const router = require('express').Router();
const { getUsers, getUserById, getCurrentUser, updateUserAvatar, updateUser, updateUserAbout, updateUserName } = require('../controllers/users');

router.get('/', getUsers);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserName, updateUserAbout);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);


module.exports = router
