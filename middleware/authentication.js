const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }

};