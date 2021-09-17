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

const verifyToken = (req, res, next) => {
    const authHeader = req.body.token || req.query.token || req.headers['authorization'] || req.headers['x-access-token'];
    console.log(authHeader);
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_ACCESS_TOKEN, (err, decodedToken) => {
            if (err) {
               return res.json({
                    error: "Invalid token"
                })
            }

            const { user_id, email } = decodedToken;
            req.user = decodedToken;
            console.log(user_id, "|||", email);
        });
        
        // req.user = decoded;
    } else {
         return res.status(401).send('Token is required to view this page');
    }
    next();

};

module.exports = verifyToken;