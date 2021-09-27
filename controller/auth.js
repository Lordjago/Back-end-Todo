require('dotenv').config();

const User = require('../database/model/users');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const axios = require('axios');

const url = "localhost:8080/api/";

const { check, validationResult } = require('express-validator');

const mailgun = require("mailgun-js");
const { json } = require('express');

const DOMAIN = 'sandboxca2e696c530f4ee9976d161fa69e8608.mailgun.org';

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

exports.getSlash = (req, res) => {
    res.redirect('sign-up');
}

//Sign-Up => GET
exports.getSignUp = (req, res) => {
    res.json({
        getSignUp: 'Signup here'
    })
}

// //Sign-Up => POST
// exports.postSignUp = (req, res) => {
//     const { first_name, last_name, email, password, confirm_password } = req.body;
//     //Checck if all fields are filled 
//     if(!(first_name, last_name, email, password, confirm_password)) return res.status(401).json({message:'All fields are required'})
//     //Check is email already exist
//     User.findOne({ email: email })
//     .then((userData) => {
//         //If email exixt return this
//         if(userData) return res.status(403).json({message:'User already Exist'});
//         //If email is not available, check is the password are ;correct
//         if(password !== confirm_password) return res.status(403).send('Password not match');
//         //hash the password
//         return hashedPassword = bcrypt.hash(password, 10)
//         .then((hashedPassword) => {
//            const user = new User({
//                first_name: first_name,
//                last_name: last_name,
//                email: email.toLowerCase(),
//                password: hashedPassword
//            })
//            //save new user to database
//            user.save((err, success) => {
//                if (err) {
//                    console.log('Error in signup: ', err);
//                    return res.status(400).json({error: err});
//                }
//                return res.status(201).json({
//                    message: "Sign-up Success"
//                });
//            });
//         })
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// }

//Sign-Up => POST
exports.postSignUp = (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    //Formating eroor to only return msg => message
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                message: error.msg,
            };
        },
    });
    let errors = myValidationResult(req);
    //Checck if all fields are filled 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() })
    }
    // json({ message: '' })
    //Check is email already exist
    User.findOne({ email: email })
        .then((userData) => {
            //If email exixt return this
            if (userData) return res.status(403).json({
                message: "User already Exist",
            })
            //If email is not available, check is the password are ;correct
            if (password !== confirm_password) return res.status(403).json({
                message: "Password not match"
            })

            const token = jwt.sign({ first_name, last_name, email, password }, process.env.JWT_ACTIVATION_TOKEN, { expiresIn: '20m' });

            const data = {
                from: 'DecOps@hello.com',
                to: email,
                subject: 'Account Activation Link',
                html: `
                    <h2> Please click on the given link to activate your account</h2>
                    <p>${process.env.CLIENT_URL}/auth/email-activate/${token}</p>
                `
            };
            mg.messages().send(data, function (error, body) {
                if (error) {
                    return res.json({ error: error.message });
                }
                return res.json({
                    message: "An email containing your account activation has been sent"
                })
                // console.log(body);
            });

        })
        .catch((err) => {
            console.log(err);
        })

}

exports.activateAccount = (req, res) => {
    const token = req.params.token;
    if (token) {
        jwt.verify(token, process.env.JWT_ACTIVATION_TOKEN, (err, decodedToken) => {
            if (err) {
                res.json({ error: "Invalid Token or Expired" })
            }
            const { first_name, last_name, email, password } = decodedToken;
            User.findOne({ email: email })
                .then((userData) => {
                    //If email exixt return this
                    if (userData) return res.status(403).json({ message: 'User already Exist' });
                    //If email is not available, check is the password are ;correct
                    // if(password !== confirm_password) return res.status(403).send('Password not match');
                    //hash the password
                    return hashedPassword = bcrypt.hash(password, 10)
                        .then((hashedPassword) => {
                            const user = new User({
                                first_name: first_name,
                                last_name: last_name,
                                email: email.toLowerCase(),
                                password: hashedPassword
                            })
                            //save new user to database
                            user.save((err, success) => {
                                if (err) {
                                    console.log('Error in signup: while account activation ', err);
                                    return res.status(400).json({ error: "Error activation" });
                                }
                                return res.status(201).json({
                                    message: "Sign-up Success!"
                                });
                            });
                        })
                })
        })
    } else {
        return res.json({ error: "Something went wrong" });
    }
}


//Forget password => GET
exports.getForgetPassword = (req, res) => {
    res.render('forget-password', { 
        title: "Forget Password", 
        message:"", 
        success: false});
}

//Forget password
exports.forgetPassword = (req, res) => {
    const email = req.body.email;
    //Formating eroor to only return msg => message
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                message: error.msg,
            };
        },
    });
    let errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() })
    }
    
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.render('forget-password', {
                    title: "Forget Password",
                    message: "User with this email does not exist",
                    success: false
                })
            }
            const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_TOKEN, { expiresIn: "20m" });
            const data = {
                from: 'DevOps@hello.com',
                to: email,
                subject: 'Reset Password',
                html: `
                    <h2> Please click on the given link to reset your password</h2>
                    <p>${process.env.CLIENT_URL}/auth/reset-password/${token}</p>
                `
            };

            user.updateOne({ resetLink: token, password: '' }, (err, success) => {
                if (err) {
                    return res.status(400).json({
                        error: err.message
                    })
                } else {
                    mg.messages().send(data, function (error, body) {
                        res.render('forget-password', {
                            title: "Forget Password",
                            message: "Reset Password via the link in your gmail! Follow the instructions",
                            success: true
                        })
                        // console.log(body);
                    });
                }
            })

        })
        .catch((err) => {
            console.log(err);
        })
}

//Forget password => GET
exports.getResetPassword = (req, res) => {
    const token = req.params.token
    res.render('reset-password', { 
        title: "Forget Password", 
        message: "", 
        success: false,
        token: token
     });
}

//Reset Password
exports.resetPassword = (req, res) => {
    const resetLink = req.params.token;
    const newPass = req.body.password;
    //Formating eroor to only return msg => message
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                message: error.msg,
            };
        },
    });
    let errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_TOKEN, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    error: "Incorrect token or Expired"
                });
            }
            User.findOne({ resetLink: resetLink }, (err, user) => {

                if (err || !user) {
                    return res.status(400).json({
                        error: "User with this token doesnt not exist"
                    })
                }

                return hashedPassword = bcrypt.hash(newPass, 10)
                    .then((hashedPassword) => {
                        //    console.log(hashedPassword);
                        user.updateOne({ password: hashedPassword, resetLink: "" }, (err, success) => {
                            const data = {
                                from: 'DecOps@hello.com',
                                to: user.email,
                                subject: 'Paasword Changed Successful',
                                html: `
                            <h2> Password Successfully changed.</h2>
                            <p>If you dont know about this action, reply immediately!!! </p>
                             `
                            };
                            mg.messages().send(data, function (error, body) {
                                if (error) {
                                    return res.json({ error: error.message });
                                }
                                return res.json({ message: "Password Changed Successful" })
                                // console.log(body);
                            });
                        })
                    })

            })
        });
    } else {
        return res.json({ error: "Something went wrong" })

    }
}

//Login => GET
exports.getLogin = (req, res) => {
    //Dummy meesage for login page
    // res.json({
    //     getLogin: 'Login here'
    // })
    res.render('login', {
        title: "Login",
        message: "",
        success: false
    })
}
//Login => POST
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //Formating eroor to only return msg => message
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                message: error.msg,
            };
        },
    });
    let errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() })
}
    //Check if email exist
    User.findOne({ email: email })
        .then((user) => {
            //if user doesnt exist return 403
            if (!user) return res.status(403).render('login', {
                title: "login",
                message: "User with this email not found!",
                success: false
            });
            //if user email exist, compare the input password and the database password
            bcrypt.compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        //Create a jwt token to 
                        const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '2h' });

                        user.token = token;

                        // res.json({
                        //     user: user
                        // });
                        console.log(token);
                        // headers: {'x-access-token', token}
                        // req.body = token;
                        // const config = {
                        //     headers: { "x-access-token" : token }
                        // };

                        // const bodyParameters = {
                        //     key: "value"
                        // };

                        // req.token = token
                        return res.redirect(`/api/dashboard?page=1&limit=3`)
                        // return res.render('/api/dashboard', {token: token})
                        // })
                    }
                    //If password doesnt match with databse, redirect to login
                    return res.render('login', {
                        title: "login",
                        message: "Invalid Password",
                        success: false
                    });
                })
        })
        .catch((err) => {
            console.log(err);
        });

}