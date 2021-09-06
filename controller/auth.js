const User = require('../model/users');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

//Sign-Up => GET
exports.getSignUp = (req, res) => {
    res.json({
        getSignUp: 'Signup here'
    })
}
//Sign-Up => POST
exports.postSignUp = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    
    User.findOne({ email: email })
    .then((userData) => {
        console.log(userData);
        if(userData) return res.status(403).send('Forbidden');
        if(password !== confirm_password) return res.status(403).send('Password not match');
        return hashedPassword = bcrypt.hash(password, 10)
        .then((hashedPassword) => {
           const user = new User({
               email: email,
               password: hashedPassword
           })
           user.save();
        })
        .then((result) => {
            res.sendStatus(201);
        })
    })
    .catch((err) => {
        console.log(err);
    })
   
}
//Login => GET
exports.getLogin = (req, res) => {
    res.json({
        getLogin: 'Login here'
    })
}
//Login => POST
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then((user) => {
        if(!user) return res.status(403).send('User not found');
        bcrypt.compare(password, user.password)
        .then((doMatch) => {
            if (doMatch) {
                jwt.sign({user}, 'secretkey', (err, token) => {
                    console.log(token);
                })
            }
            res.redirect('/login');
        })
    })
    .catch((err) => {
        console.log(err);
    });

}