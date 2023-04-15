const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
// console.log('router loaded');


router.get('/',homeController.home);
router.use('/users' , require('./users'));


module.exports = router;