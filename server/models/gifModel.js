const pool = require('./db');

module.exports = () => {
  const createGifsTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS 
        gifs (
            gif_id SERIAL PRIMARY KEY,
            title VARCHAR(128) NOT NULL,
            image_url VARCHAR(128) NOT NULL,
            public_id varchar NOT NULL,
            created_at timestamp with time zone NOT NULL,
            user_id SERIAL NOT NULL,
            FOREIGN KEY (user_id) 
            REFERENCES users (id)
            );
            
        CREATE TABLE IF NOT EXISTS gif_comment (
            gif_id INTEGER NOT NULL,
            comment_id SERIAL PRIMARY KEY,
            comment VARCHAR NOT NULL,        
            created_at timestamp with time zone NOT NULL,
            author_id INTEGER NOT NULL,
            user_name  VARCHAR(255) NOT NULL,
            FOREIGN KEY (author_id) 
            REFERENCES users (id));

        CREATE TABLE IF NOT EXISTS gif_likes (
            like_id SERIAL PRIMARY KEY, 
            likes VARCHAR (250) NOT NULL,
            created_at timestamp with time zone NOT NULL,
            gif_id INTEGER NOT NULL,
            author_id INTEGER NOT NULL,
            user_name  CHARACTER VARYING,
            FOREIGN KEY (author_id) 
            REFERENCES users (id)
            )
      `);
    } catch (error) {
      console.log(error);
    }
  };
  createGifsTable();
};
