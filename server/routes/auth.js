const express = require('express');
const { register, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
  res.json({ userId: req.user.id, firstName: req.user.firstName, email: req.user.email });
});

module.exports = router;
