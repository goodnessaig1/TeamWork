const createNewGif = 'INSERT INTO gifs (title, imageurl, createdon) VALUES($1,$2,$3) RETURNING *';

module.exports = {
    createNewGif,
};