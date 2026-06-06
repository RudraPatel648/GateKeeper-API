const jwt = require('jsonwebtoken')


const authenticationMiddleware = (req, res, next) => {
    const authHead = req.headers.authorization;

    if (!authHead || !authHead.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Please provide valid header' });
    }

    const token = authHead.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
    }
    catch (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }

    next();
}

module.exports = authenticationMiddleware