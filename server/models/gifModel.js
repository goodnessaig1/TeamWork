const pool = require("./db");

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
            PRIMARY KEY (gif_id),
            FOREIGN KEY (user_id) 
            REFERENCES users (id)
            );
            
        CREATE TABLE IF NOT EXISTS gif_comment (
            gif_id INTEGER NOT NULL,
            comment_id SERIAL PRIMARY KEY,
            comments VARCHAR NOT NULL,        
            created_at timestamp with time zone NOT NULL,
            created_by VARCHAR NOT NULL,
            user_id INTEGER NOT NULL,
            img_url character varying,
            user_name  VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) 
            REFERENCES users (id));
      `);
    } catch (error) {
      console.log(error);
    }
  };
  createGifsTable();
};