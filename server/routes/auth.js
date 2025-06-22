const express = require('express');
const { register, login, googleCallback } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const passport = require('passport');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
  res.json({ userId: req.user.id, firstName: req.user.firstName, email: req.user.email });
});

// Start Google OAuth flow
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

module.exports = router;
