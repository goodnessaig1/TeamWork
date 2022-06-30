/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
   if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decodedPayload = jwt.verify(token, 'jwtPrivateKey');
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};  
}


module.exports = authorization