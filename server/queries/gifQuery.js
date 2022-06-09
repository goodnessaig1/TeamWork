const createNewGif = 'INSERT INTO gifs (title, image_url, public_id, created_at, created_by, user_id) VALUES($1,$2,$3,$4, $5, $6) RETURNING *';

module.exports = {
    createNewGif,
};