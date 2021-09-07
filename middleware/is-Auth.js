module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];    
    if (typeof authHeader !== 'undefined') {
        const bearer = authHeader.split(' ')[1];
        console.log(bearer);
        req.token = bearer;
        next();
    } else {
        res.sendStatus(401);
    }
    
}