/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, 'jwtPrivateKey', (err, user) => {
      if (err) res.status(401).send('Access denied. No token provided.');
      req.user = user;
      next();
    });
  } else {
    return res.status(400).send('Invalid token.');
  }
};

module.exports = authorization