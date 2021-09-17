require('express-router-group');

const express = require('express');

const router = express.Router();

const userController = require('../controller/auth')

router.group('/auth', router => {
    //Sign up todos
    router.get('/sign-up', userController.getSignUp);

    //Login => GET
    router.get('/login', userController.getLogin);

    //Sign up todos => POST
    router.post('/sign-up', userController.postSignUp);

    //Login => POST
    router.post('/login', userController.postLogin);

    //Activate Account 
    router.post('/email-activate/:token', userController.activateAccount);

    //Forget Passord
    router.put('/forget-password/', userController.forgetPassword);

    //Reset Password
    router.post('/reset-password/:token', userController.resetPassword);
});


module.exports = router;