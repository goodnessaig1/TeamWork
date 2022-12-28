const pool = require('./db');

module.exports = () => {
  const createArticlesLIkesTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS articleLikes (
                    article_id INTEGER NOT NULL,
                    author_id INTEGER NOT NULL,
                    FOREIGN KEY (author_id) 
                    REFERENCES users (id)
                    )`);
    } catch (error) {
      console.log(error);
    }
  };

  createArticlesLIkesTable();
};
