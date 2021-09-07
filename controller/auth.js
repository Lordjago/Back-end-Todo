require('dotenv').config();

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
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    //Checck if all fields are filled 
    if(!(first_name, last_name, email, password, confirm_password)) return res.status(401).send('All fields are required')
    //Check is email already exist
    User.findOne({ email: email })
    .then((userData) => {
        //If email exixt return this
        if(userData) return res.status(403).send('User already Exist');
        //If email is not available, check is the password are ;correct
        if(password !== confirm_password) return res.status(403).send('Password not match');
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
    //Dummy meesage for login page
    res.json({
        getLogin: 'Login here'
    })
}
//Login => POST
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //Checck if all fields are filled 
    if(!(email && password)) return res.status(400).send('All field required');
    //Check if email exist
    User.findOne({email: email})
    .then((user) => {
        //if user doesnt exist return 403
        if(!user) return res.status(403).send('User not found');
        //if user email exist, compare the input password and the database password
        bcrypt.compare(password, user.password)
        .then((doMatch) => {
            if (doMatch) {
                //Create a jwt token to 
                const token = jwt.sign({user_id: user._id, email }, process.env.ACCESS_TOKEN , {expiresIn: '2h'});
                user.token = token;
                // return res.json({
                //     user: user
                // });
                // console.log(token);
                // req.header['authorization'] = token;
                return res.redirect('/api/todos');
                // })
            }
            //If password doesnt match with databse, redirect to login
            res.redirect('/login');
        })
    })
    .catch((err) => {
        console.log(err);
    });

}