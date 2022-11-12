const pool = require('./db');

module.exports = () => {
  const createArticlesLIkesTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS articleLikes (
                    like_id SERIAL PRIMARY KEY, 
                    likes VARCHAR (250) NOT NULL,
                    created_at timestamp with time zone NOT NULL,
                    article_id INTEGER NOT NULL,
                    author_id INTEGER NOT NULL,
                    image_ul CHARACTER VARYING,
                    user_name  CHARACTER VARYING,
                    FOREIGN KEY (author_id) 
                    REFERENCES users (id)
                    )`);
    } catch (error) {
      console.log(error);
    }
  };

  createArticlesLIkesTable();
};
