const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/register', registerUser); // Typically protected or disabled in production if not needed

module.exports = router;
