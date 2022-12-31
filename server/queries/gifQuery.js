const createNewGif =
  'INSERT INTO gifs (title, image_url, public_id, created_at, user_id) VALUES($1,$2,$3,$4, $5) RETURNING *';
const selectGif = `SELECT * FROM gifs WHERE id = $1`;
const deleteGif = `DELETE FROM gifs WHERE id = $1`;
const selectAllGifs = 'SELECT * FROM gifs ORDER BY created_at DESC';
const selectUser = `SELECT * FROM users WHERE id = $1`;

//   GIF COMMENT
const createGifComment = `INSERT INTO gif_comment (gif_id, comment, author_id, created_at, user_name )VALUES ($1, $2, $3, $4, $5) RETURNING *`;
const getGifComments =
  'SELECT gif_comment.gif_id as commentid, comment, gif_comment.created_at as createdat, gif_comment.author_id as userauthorId FROM gif_comment WHERE gif_id = $1 ORDER BY created_at DESC';

//  GIF LIKES
const selectIfUserLike = `SELECT * FROM gif_likes where gif_id = $1 and author_id = $2`;
const createLike =
  'INSERT INTO gif_likes ( gif_id, author_id) VALUES ($1, $2)RETURNING * ';
const deleteLike = `DELETE FROM gif_likes where author_id = $1`;

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
};
