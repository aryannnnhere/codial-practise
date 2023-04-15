const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/users');

router.get('/profile', userControllers.profile);

module.exports = router;