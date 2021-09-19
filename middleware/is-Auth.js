// require('dotenv').config();

// const jwt = require('jsonwebtoken');

// const verifyToken =  (req, res, next) => {
//     const authHeader = req.body.token || req.query.token || req.headers['authorization'] || req.headers['x-access-token']; 
//     if (!authHeader) return res.status(401).send('Token is required to view this page');   
//     try {
//         const decoded = jwt.verify(authHeader, process.env.JWT_ACCESS_TOKEN);
//         req.user = decoded;
//     } catch (error) {
//         res.status(401).send('Invalid Token');
//     }
//     next();
    
// };

// module.exports = verifyToken;

require('dotenv').config();

const jwt = require('jsonwebtoken');

// const { authHeader } = require('../controller/auth').authHeader()

const verifyToken = (req, res, next) => {
    // const authHeader = req.body.token || req.query.token || req.headers['authorization'] || req.headers['x-access-token'];
    // console.log(`From middleware: ${authHeader}`);
    const authHeader = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE0NTM2OWQxMGQzMzNjNTU3Y2QzMjYwIiwiZW1haWwiOiJpYW1qYWdvYmFua3MwMUBnbWFpbC5jb20iLCJpYXQiOjE2MzIwODAwODgsImV4cCI6MTYzMjA4NzI4OH0.Fj4rQeXibiZEGdLzxJnlac8mnIu-jMJRjPkvims-Zy0"
    // if(authHeader == 'undefined') return res.json('Invalid token')
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_ACCESS_TOKEN, (err, decodedToken) => {
            if (err) {
               return res.json({
                    error: "Invalid token"
                })
            }

            const { user_id, email } = decodedToken;
            req.query.token = authHeader;
            req.user = decodedToken;
            // console.log(user_id, "|||", email);
        });
        
        // req.user = decoded;
    } else {
        return res.redirect('/auth/login')
        //  return res.status(401).send('Token is required to view this page');
    }
    next();

};

module.exports = verifyToken;