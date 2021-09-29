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
    const authHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE1MzhiZTU2M2E1NGE5MmMyY2EzMjEyIiwiZW1haWwiOiJpYW1qYWdvYmFua3MwMUBnbWFpbC5jb20iLCJhY3RpdmF0aW9uIjp0cnVlLCJpYXQiOjE2MzI5MDgzNzQsImV4cCI6MTYzMjkxNTU3NH0.TYybBaw9TE2SSugXNdoXPAwcotTc9cF7MXpXbYPKlpY';
    // if(authHeader == 'undefined') return res.json('Invalid token')
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_ACCESS_TOKEN, (err, decodedToken) => {
            if (err) {
               return res.json({
                    error: "Invalid token"
                })
            }

            req.user  = decodedToken;
            next();
        });
    } else {
         return res.status(401).send('Token is required to view this page');
    }

};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.activation) {
            next();
        } else {
            res.status(403).json({message:"You are not allow to perform this operation. Please verify your account"})
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization
};