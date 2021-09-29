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