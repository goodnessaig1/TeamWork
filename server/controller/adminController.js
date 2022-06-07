const bcrypt = require('bcrypt');
const db = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const queries = require('../queries/adminQuery');
const jwt = require('jsonwebtoken')

 
// ADMIN AND EMPLOYEE REGISTER

const register = async(req, res)=>{
    try {
        const { firstname,lastname,email,password,gender,jobRole, department,isAdmin, address } = req.body;
db.pool.connect((err, client, done) => {

    client.query(queries.createNewUser, [firstname, lastname, email, bcryptPassword,gender,jobRole,department, isAdmin,address], (error, data) => {
        done();
         const token = jwtGenerator(data.rows[0].id);

        if (error) {
          res.status(400).json({ error });
        } else {
           res.status(201).json({ status: "success", data: {
             message: "User account successfully created",
             "token": token,
             "userId": data.rows[0].id
         }  }) 
        }
      });
      });
  
         const saltRounds = 10;
         const salt = await bcrypt.genSalt(saltRounds);
         const bcryptPassword = await bcrypt.hash(password, salt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};



//  LOGIN ROUTE
const loginUser = async  (req, res) => {
  try {
      const data = {
    email: req.body.email,
    password: req.body.password,
  };

  db.pool.connect((err, client, done) => {
    const value = [data.email];

    client.query(queries.logInUser, value, (error, user) => {
      done();

      if (user.rows < 1) {
        return res.status(401).json({
          message: 'Please check your Email and Password',
          error,
        });
      }

       const validPassword = bcrypt.compare(data.password, user.rows[0].password);
        if(!validPassword){
            return res.status(401).json
            ({message: "Password Or Email is Incorrect"})
        }

      const token = jwt.sign({
          userId: user.rows[0].id,
          email: user.rows[0].email,
    }, 'jwtPrivateKey');
      return res.json({ status: "success", data: {
            message: "You have succefully log in",
            "token": token,
            "userid": user.rows[0].id
        }  })
    });
  });
  }catch (err) {
         console.error(err.message);
        res.status(500).send("Server Error");
    }
}


module.exports = {
    register,
    loginUser
};