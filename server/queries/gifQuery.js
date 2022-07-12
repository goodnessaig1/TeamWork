const createNewGif = 'INSERT INTO gifs (title, image_url, public_id, created_at, user_id) VALUES($1,$2,$3,$4, $5) RETURNING *';
const selectGif = `SELECT * FROM gifs WHERE gif_id = $1`
const deleteGif = `DELETE FROM gifs WHERE gif_id = $1`
const selectAllGifs = 'SELECT * FROM gifs ORDER BY created_at DESC'

const selectUser = `SELECT * FROM users WHERE id = $1`
//   GIF COMMENT
const createGifComment = `INSERT INTO gif_comment (gif_id, comments, user_id, created_at, user_name )VALUES ($1, $2, $3, $4, $5) RETURNING *`
const getGifComments = "SELECT comment_id as commentid, comments, gif_comment.created_at as createdat, gif_comment.user_id as useauthorIdrId FROM gif_comment WHERE gif_id = $1 ORDER BY created_at DESC"

module.exports = {
    createNewGif,
    selectGif,
    selectAllGifs,
    deleteGif,
    selectUser,
    createGifComment,
    getGifComments
};