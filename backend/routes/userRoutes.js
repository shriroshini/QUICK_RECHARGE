const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', getProfile);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;