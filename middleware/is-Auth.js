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
    // const authHeader = req.body.token || req.query.token || req.headers['authorization'] || req.headers['x-access-token'];
    // console.log(authHeader);
    const authHeader = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE0NTM2OWQxMGQzMzNjNTU3Y2QzMjYwIiwiZW1haWwiOiJpYW1qYWdvYmFua3MwMUBnbWFpbC5jb20iLCJpYXQiOjE2MzE5NjQyNjgsImV4cCI6MTYzMTk3MTQ2OH0.pT88gZ9GTzxgW_kOxIZCYKqyq2TveJ4Iit9ZmAMQNeE"
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