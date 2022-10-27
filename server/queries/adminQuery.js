const checkIfUserExist = 'SELECT * FROM users WHERE email = $1';
const createNewUser =
  'INSERT INTO users (first_name, last_name, email,  password, gender, jobRole, department, is_admin,  address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
const logInUser = 'SELECT * FROM users WHERE email = $1';
const selectUser =
  'SELECT userid, email, first_name, last_name FROM users WHERE userid = $1';
const getAllUsers = 'SELECT * FROM users';
const userAuth = 'SELECT * FROM users WHERE email = $1';
const selectUserId = 'SELECT * FROM users WHERE id =$1';

const uploadPix =
  'UPDATE users SET profile_pix = $1 WHERE id = $2  RETURNING *';
const coverPhoto =
  'UPDATE users SET cover_photo = $1 WHERE id = $2  RETURNING *';
const phoneNumber = 'UPDATE users SET number = $1 WHERE id = $2  RETURNING *';

const changePassword =
  'UPDATE users SET password = $1 WHERE email = $2  RETURNING *';

module.exports = {
  checkIfUserExist,
  createNewUser,
  logInUser,
  selectUser,
  getAllUsers,
  userAuth,
  selectUserId,
  uploadPix,
  coverPhoto,
  phoneNumber,
  changePassword,
};
