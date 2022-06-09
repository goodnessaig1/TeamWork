const createNewGif = 'INSERT INTO gifs (title, imageurl, createdat, createdby) VALUES($1,$2,$3,$4) RETURNING *';

module.exports = {
    createNewGif,
};