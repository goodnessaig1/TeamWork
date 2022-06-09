const bcrypt = require('bcrypt');
const pool = require('../models/db');
// const jwtGenerator = require('../utils/jwtGenerator');
const queries = require('../queries/adminQuery');
const jwt = require('jsonwebtoken')
require('../models/userModel')();
const { createToken, verifyToken } = require('../utils/jwtGenerator')



// ADMIN AND EMPLOYEE REGISTER

class UserController {

  static async register(req, res) {
        try {
          const { firstname,lastname,email,password,gender,jobRole, department,isAdmin, address } = req.body;

        const saltRounds = 10;
         const salt = await bcrypt.genSalt(saltRounds);
         const bcryptPassword = await bcrypt.hash(password, salt);
          const createdAt = new Date
          const updatedAt = new Date
         let user = await pool.query(queries.newUser, [email]);
    if (user.rowCount > 0) {
      return res.status(401).json({
        status: 'Failed',
        data: {
          message: 'User with this email already exist',
        },
      });
    }
     user = await pool.query(queries.createNewUser ,[firstname, lastname, email, bcryptPassword,gender, jobRole,department,isAdmin, address, createdAt, updatedAt]);
         const token = createToken({email: user.rows[0].email});
         res.status(201).json({ status: "success", data: {
             message: "User account successfully created",
             "token": token,
             "userId": user.rows[0].id,
             "createdAt": user.rows[0].createdat,
             "updatedAt": user.rows[0].updatedat
         }  }) 
        }catch (err) {
         console.error(err.message);
        res.status(500).send("Server Error");
    }
  }




 //  LOGIN ROUTE

  static async loginUser(req, res) {
    try {
      const { email, password }= req.body;
    
        const user = await pool.query(queries.logInUser, [ email])
        if (user.rows.length === 0) {
            return res.status(401).json({status: "password or email incorrect"});
        } 
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword){
            return res.status(401).json
            ("Password Or Email is Incorrect")
        }
        const token = createToken({email: user.rows[0].email
    });
        res.json({ status: "success", data: {
            message: "You have succefully log in",
            "token": token,
            "userid": user.rows[0].id
        }  })
    }catch (err) {
         console.error(err.message);
        res.status(500).send("Server Error");
    }
    

  }


}


module.exports = UserController;