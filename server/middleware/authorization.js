/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
// require("dotenv").config();


const authorization = (req, res, next)=> {
  const token = req.header("token");

  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  try {
    const verify = jwt.verify(token, 'jwtPrivateKey');

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authorization