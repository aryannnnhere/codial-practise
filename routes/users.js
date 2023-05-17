const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/users_controllers');

router.get('/profile', userControllers.profile);

module.exports = router;