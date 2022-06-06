const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const queries = require('../queries/adminQuery');


 

// ADMIN AND EMPLOYEE REGISTER

const register = async(req, res)=>{
    try {
        const { firstname,lastname,email,password,gender,jobRole, department,isAdmin, address } = req.body;
        const user = await pool.query(queries.newUser, [
            email
        ]);
        if(user.rows.length !== 0){
            return res.status(401).send({message: "User with this email already exist"})
        }
         const saltRounds = 10;
         const salt = await bcrypt.genSalt(saltRounds);
         const bcryptPassword = await bcrypt.hash(password, salt);
         const newUser = await pool.query(queries.createNewUser ,[firstname, lastname, email, bcryptPassword,gender,jobRole,department, isAdmin,address]);
         const token = jwtGenerator(newUser.rows[0].id);
         res.status(201).json({ status: "success", data: {
             message: "User account successfully created",
             "token": token,
             "userId": newUser.rows[0].id
         }  }) 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

//  LOGIN ROUTE
const loginUser = async (req, res)=>{
    try {
        const { email, password }= req.body;
    
        const user = await pool.query(queries.logInUser, [ email])
        if (user.rows.length === 0) {
            return res.status(401).json({ message:"password or email incorrect"});
        } 
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword){
            return res.status(401).json
            ({message: "Password Or Email is Incorrect"})
        }
        const token = jwtGenerator(user.rows[0].id);
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



module.exports = {
    register,
    loginUser
};