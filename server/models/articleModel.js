const pool = require('./db');

module.exports = () => {
  const createArticleTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS 
        articles (
        article_id SERIAL PRIMARY KEY,
        title CHARACTER VARYING NOT NULL,
        article CHARACTER VARYING NOT NULL,
        user_id INTEGER NOT NULL,
        flagged BOOLEAN DEFAULT false NOT NULL,
        flagged_at DATE DEFAULT NULL,
        created_at DATE NOT NULL,
        updated_at DATE NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users (id)
        )`);
    } catch (error) {
      console.log(error);
    }
  };
  createArticleTable();
};
