const db = require("./db");

module.exports = () => {
  const createGifsTable = async () => {
    try {
      await db.query(`CREATE TABLE IF NOT EXISTS 
        gifs (
            gif_id SERIAL PRIMARY KEY,
            title VARCHAR(128) NOT NULL,
            image_url VARCHAR(128) NOT NULL,
            public_id varchar NOT NULL,
            created_at timestamp with time zone NOT NULL,
            created_by VARCHAR(128) NOT NULL,
            user_id SERIAL NOT NULL,
            PRIMARY KEY (gif_id),
            FOREIGN KEY (user_id) 
            REFERENCES users (Id)
            )`
        );
    } catch (error) {
      console.log(error);
    }
  };
  createGifsTable();
};