/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const authorizations = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (!token)
      return res.status(401).send('Access denied. No token provided.');
    try {
      const decodedPayload = jwt.verify(token, 'jwtPrivateKey');
      req.user = decodedPayload;
      next();
    } catch (err) {
      res.status(400).send({
        message: 'Invalid token.',
        error: err.message,
      });
    }
  }
};

module.exports = authorizations;
