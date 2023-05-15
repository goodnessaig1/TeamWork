const checkIfUserExist = 'SELECT * FROM users WHERE email = $1';
const createNewUser =
  'INSERT INTO users (first_name, last_name, email,  password, gender, jobRole, department, is_admin,  address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
const logInUser = 'SELECT * FROM users WHERE email = $1';
const selectUser =
  'SELECT userid, email, first_name, last_name FROM users WHERE userid = $1';
const userAuth = 'SELECT * FROM users WHERE id = $1';
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

const userPosts = `
SELECT 
    postid, 
    title, 
    post, 
    post_date,
	color,
  color_id,
    post_author,
	user_id,
    isAdmin,
    profile, 
    jobrole, 
    number_of_comment, 
    number_of_likes, 
    liked, 
    comments
FROM 
    (SELECT  
        a.id as postid, 
        a.title as title, 
        a.article as post, 
        a.created_at as post_date,
	 	col.color,
    a.color_id as color_id,
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
	 	u.id as user_id,
        u.is_admin as isAdmin,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.id) as number_of_comment,
        (SELECT COUNT(article_id) FROM articleLikes WHERE article_id = a.id) as number_of_likes,
        EXISTS(SELECT * FROM articleLikes l WHERE l.article_id = a.id and l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT 
                ac.id, 
                ac.comment, 
                ac.created_at as comment_date,
                u.is_admin as isAdmin, 
                CONCAT(u.first_name, ' ', u.last_name) as comment_author,
                u.profile_pix as comment_author_profile
            FROM 
                articles_comments ac 
                JOIN users u ON u.id = ac.author_id 
            WHERE 
                ac.article_id = a.id 
            ORDER BY 
                ac.created_at DESC 
            LIMIT 
                3
        ) c) as comments
    FROM 
        articles a
        LEFT JOIN users u ON u.id = a.user_id
	 	LEFT JOIN colors col ON col.id = a.color_id
    	WHERE u.id = $2
	UNION ALL
    SELECT
        g.id as postid, 
        g.title as title, 
        g.image_url as post, 
        g.created_at as post_date, 
	 	NULL as color,
	 	NULL as color_id,
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
	 	u.id as user_id,
        u.is_admin as isAdmin,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(gif_id) FROM gif_comment  WHERE gif_id = g.id) as number_of_comment,
        (SELECT COUNT(gif_id) FROM gif_likes WHERE gif_id = g.id) as number_of_likes,
        EXISTS(SELECT * FROM gif_likes l WHERE l.gif_id = g.id and l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT 
                gc.id, 
                gc.comment, 
                gc.created_at as comment_date,
                u.is_admin as isAdmin, 
                CONCAT(u.first_name, ' ', u.last_name) as comment_author,
                u.profile_pix as comment_author_profile
            FROM 
                gif_comment gc 
                JOIN users u ON u.id = gc.author_id 
            WHERE 
                gc.gif_id = g.id 
            ORDER BY 
                gc.created_at DESC 
            LIMIT 
                3
        ) c) as comments
    FROM 
        gifs g
        LEFT JOIN users u ON u.id = g.user_id
	 	WHERE u.id = $2
    ) subquery
ORDER BY 
    post_date DESC
LIMIT 
    $3 OFFSET $4
`;
const totalRows = `
SELECT 
  (SELECT COUNT(*) FROM articles where user_id = $1) + 
  (SELECT COUNT(*) FROM gifs where user_id = $1) as TotalRows;
`;

const searchUser = `SELECT * FROM users WHERE LOWER(first_name) LIKE LOWER($1) OR LOWER(last_name) LIKE LOWER($1)
 `;

const updateUser =
  'UPDATE users SET first_name = $1, last_name = $2, updated_at = $3, address = $4, number = $5 WHERE id = $6  RETURNING *';
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
  userPosts,
  totalRows,
  searchUser,
  updateUser,
};
