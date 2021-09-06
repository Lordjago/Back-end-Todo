const express = require('express');

const router = express.Router();

const userController = require('../controller/auth')

//Sign up todos
router.get('/sign-up', userController.getSignUp);

//Sign up todos => POST
router.post('/sign-up', userController.postSignUp);

//Login => GET
router.get('/login', userController.getLogin);

//Login => POST
router.post('/login', userController.postLogin);

module.exports = router;