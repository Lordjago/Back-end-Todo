require('express-router-group');

const express = require('express');

const router = express.Router();

const userController = require('../controller/auth');

const { 
    register,
    login,
    forgetPassword,
    resetPassword 
} = require('../middleware/validator');

router.group('/auth', router => {
    //Sllash
    router.get('/', userController.getSlash);

    //Sign up todos
    router.get('/sign-up', userController.getSignUp);

    //Login => GET
    router.get('/login',  userController.getLogin);

    //Sign up todos => POST
    router.post('/sign-up', register, userController.postSignUp);

    //Login => POST
    router.post('/login', login, userController.postLogin);

    //Activate Account 
    router.get('/email-activate/:token', userController.activateAccount);

    //Forget Passord => GET
    router.get('/forget-password/', userController.getForgetPassword);

    //Forget Passord => POST
    router.post('/forget-password/', forgetPassword, userController.forgetPassword);

    //Reset Password => GET
    router.get('/reset-password/:token', userController.getResetPassword);

    //Reset Password
    router.post('/reset-password/:token', resetPassword, userController.resetPassword);
});


module.exports = router;