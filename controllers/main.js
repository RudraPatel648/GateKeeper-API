const jwt = require('jsonwebtoken');
const users = require('../db/users');

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'please provide username and password' });
    }

    const user = users.find(
        user => (user.username === username)
    );

    if (!user || user.password !== password) {
        return res.status(401).json({
            msg: 'Invalid credentials'
        });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.status(200).json({ token })
}

const access = (req , res) =>{
    const data = {msg : `Authorized Access for ${req.user.username}`}
    res.status(200).json(data)
}

module.exports = {
    login,
    access
}