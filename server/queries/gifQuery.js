const createNewGif =
  'INSERT INTO gifs (title, image_url, public_id, created_at, user_id) VALUES($1,$2,$3,$4, $5) RETURNING *';
const selectGif = `SELECT * FROM gifs WHERE id = $1`;
const deleteGif = `DELETE FROM gifs WHERE id = $1`;
const selectAllGifs = 'SELECT * FROM gifs ORDER BY created_at DESC';
const selectUser = `SELECT * FROM users WHERE id = $1`;
const selectUserDetails = 'SELECT * FROM users WHERE id =$1';

//   GIF COMMENT
const createGifComment = `INSERT INTO gif_comment (gif_id, comment, author_id, created_at, user_name )VALUES ($1, $2, $3, $4, $5) RETURNING *`;
const getGifComments = `SELECT c.gif_id as post_id, c.comment, c.created_at as date, c.author_id as authorId, CONCAT(u.first_name, ' ', u.last_name) as post_author,
u.profile_pix as comment_author_profile 
FROM gif_comment c
LEFT JOIN users u ON u.id = c.author_id
WHERE gif_id = $1 ORDER BY c.created_at ASC`;

//  GIF LIKES
const selectIfUserLike = `SELECT * FROM gif_likes where gif_id = $1 and author_id = $2`;
const createLike =
  'INSERT INTO gif_likes ( gif_id, author_id) VALUES ($1, $2)RETURNING * ';
const deleteLike = `DELETE FROM gif_likes where author_id = $1`;
const getUpdatedGif = `SELECT g.image_url as post, g.title as title,g.created_at as post_date, g.id as postId, c.comment_id as comment_id, c.comment as comment, c.created_at as date, CONCAT(u.first_name, ' ', u.last_name) as post_author,u2.profile_pix as comment_author_profile, u2.first_name as comment_author,u2.last_name as comment_author_last_name,u.jobrole as author_jobrole, u.profile_pix,
(SELECT COUNT(gif_id) FROM gif_comment WHERE gif_id = g.id) as number_of_commennt,
(SELECT COUNT(gif_id) FROM gif_likes WHERE gif_id = g.id) as number_of_likes,
EXISTS(SELECT * FROM gif_likes l WHERE l.gif_id = g.id and l.author_id = $1) AS isLiked
FROM gifs g
LEFT JOIN gif_comment c ON c.gif_id = g.id
LEFT JOIN users u ON u.id = g.user_id
LEFT JOIN users u2 ON u2.id = c.author_id
WHERE g.id= $2
ORDER BY post_date DESC, date DESC NULLS LAST
`;

module.exports = {
  createNewGif,
  selectGif,
  selectAllGifs,
  deleteGif,
  selectUser,
  createGifComment,
  getGifComments,
  createLike,
  selectIfUserLike,
  deleteLike,
  selectUserDetails,
  getUpdatedGif,
};
