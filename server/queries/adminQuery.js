const checkIfUserExist = 'SELECT * FROM users WHERE email = $1';
const createNewUser =
  'INSERT INTO users (first_name, last_name, email,  password, gender, jobRole, department, is_admin,  address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
const logInUser = 'SELECT * FROM users WHERE email = $1';
const selectUser =
  'SELECT userid, email, first_name, last_name FROM users WHERE userid = $1';
const userAuth = 'SELECT * FROM users WHERE email = $1';
const selectUserId = 'SELECT * FROM users WHERE id =$1';

const uploadPix =
  'UPDATE users SET profile_pix = $1 WHERE id = $2  RETURNING *';
const coverPhoto =
  'UPDATE users SET cover_photo = $1 WHERE id = $2  RETURNING *';
const phoneNumber = 'UPDATE users SET number = $1 WHERE id = $2  RETURNING *';

const changePassword =
  'UPDATE users SET password = $1 WHERE email = $2  RETURNING *';

const getAllUsers = `
  SELECT u.id,u.created_at as joined, CONCAT(u.first_name, ' ', u.last_name) as user_name,
    u.profile_pix as profile_pix ,
    u.is_admin,
    u.email,
    (SELECT COALESCE(SUM(post_count), 0) FROM
      (SELECT COUNT(id) AS post_count FROM articles a WHERE user_id = u.id 
        UNION ALL
      SELECT COUNT(id) AS post_count FROM gifs g WHERE user_id = u.id) AS post_counts
      ) AS user_total_posts
    FROM users u
    GROUP BY u.id
    ORDER BY joined DESC
  `;

const deleteUser = `DELETE FROM users WHERE id = $1`;
const makeAdmin = 'UPDATE users SET is_admin = true WHERE id = $1  RETURNING *';
const disableAdmin =
  'UPDATE users SET is_admin = false WHERE id = $1  RETURNING *';

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
  deleteUser,
  disableAdmin,
  makeAdmin,
};
