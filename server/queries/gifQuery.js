const createNewGif = 'INSERT INTO gifs (title, image_url, public_id, created_at, user_id) VALUES($1,$2,$3,$4, $5) RETURNING *';

//   GIF COMMENT
const createGifComment = `INSERT INTO gif_comment (gif_id, comments, user_id, created_at, img_url, user_name )VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`


module.exports = {
    createNewGif,
    createGifComment,
};