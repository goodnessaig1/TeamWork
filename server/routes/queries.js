const newUser = "SELECT * FROM users WHERE email = $1"
const createNewUser = "INSERT INTO users (firstname, lastname, email,  password, gender, jobRole, department, isAdmin,  address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
const logInUser = "SELECT * FROM users WHERE email = $1";
const selectUser = "SELECT userid, email, firstname, lastname FROM users WHERE userid = $1";

module.exports = {
    newUser,
    createNewUser,
    logInUser,
    selectUser
};