const createNewGif = 'INSERT INTO gifs (title, image_url, public_id, created_at, user_id) VALUES($1,$2,$3,$4, $5) RETURNING *';

module.exports = {
    createNewGif,
};