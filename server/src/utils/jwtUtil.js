const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_art'

export const generateToken = user => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username
        }, 
        SECRET_KEY/* , { expiresIn: '10h' } */)
};