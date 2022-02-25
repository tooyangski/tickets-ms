const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentuser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentuser);

module.exports = router;
