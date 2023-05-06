const pool = require('./db');

module.exports = () => {
  const createArticlesCommentsTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS articles_comments (
                    id SERIAL PRIMARY KEY, 
                    comment VARCHAR (250) NOT NULL,
                    created_at timestamp with time zone NOT NULL,
                    article_id INTEGER NOT NULL,
                    flagged BOOLEAN DEFAULT false NULL,
                    author_id INTEGER NOT NULL,
                    FOREIGN KEY (author_id) 
                    REFERENCES users (id)
                    )`);
    } catch (error) {
      console.log(error);
    }
  };

  createArticlesCommentsTable();
};
