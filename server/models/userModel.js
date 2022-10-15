const pool = require('./db');

module.exports = () => {
  const createGenresTable = async () => {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL NOT NULL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          gender VARCHAR(255),
          jobRole VARCHAR(255),
          department VARCHAR(255),
          is_admin BOOLEAN NOT NULL DEFAULT false,
          address VARCHAR(255),
          profile_pix VARCHAR(128) NULL,
          cover_photo VARCHAR(128) NULL,
          number VARCHAR(128) NULL,
          created_at  DATE NOT NULL,
          updated_at  DATE NOT NULL);
      `);
    } catch (error) {
      console.log(error);
    }
  };
  createGenresTable();
};

// SELECT articles.article_id as id ,articles.user_id as user_id , articles.title, articles.article as post, first_name, last_name, articles.created_at FROM articles INNER JOIN users ON articles.user_id = users.id

// UNION

// SELECT gifs.gif_id, gifs.user_id as id ,gifs.title, gifs.image_url as post, first_name, last_name, gifs.created_at FROM gifs INNER JOIN users ON gifs.user_id = users.id
