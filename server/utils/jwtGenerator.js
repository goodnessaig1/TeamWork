/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(id){
    const payload = {
        user: id
    }

   return jwt.sign(payload, process.env.SUPERSEC)
}

module.exports = jwtGenerator