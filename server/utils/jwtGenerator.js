/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const createToken = (data) => {
  const token = jwt.sign(data, 'jwtPrivateKey', { expiresIn: '1h' });

  return token;
};

module.exports = {
  createToken,
};
