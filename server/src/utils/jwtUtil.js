const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_art'

export const generateToken = user => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
            img: user.img
        }, 
        SECRET_KEY/* , { expiresIn: '10h' } */)
};

export const checkToken = (context) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          return user;
        } catch (err) {
          throw new Error('Invalid/Expired token');
        }
      }

      throw new Error('Authentication token must be Bearer [token]');
    }

    throw new Error('Authorization header must be provided');
}