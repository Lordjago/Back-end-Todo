require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifyToken =  (req, res, next) => {
    const authHeader = req.body.token || req.query.token || req.headers['authorization'] || req.headers['x-access-token']; 
    if (!authHeader) return res.status(401).send('Token is required to view this page');   
    try {
        const decoded = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
        req.user = decoded;
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
    next();
    
};

module.exports = verifyToken;