const pool = require("./db");

module.exports = () => {
  const createArticlesCommentsTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS articles_comments (
                    comment_id SERIAL PRIMARY KEY, 
                    comment VARCHAR (250) NOT NULL,
                    created_at DATE NOT NULL,
                    article_id INTEGER NOT NULL,
                    flagged BOOLEAN DEFAULT false NULL,
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

  createArticlesCommentsTable();
};