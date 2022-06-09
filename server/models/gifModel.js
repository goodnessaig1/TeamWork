const db = require("./db");

module.exports = () => {
  const createGifsTable = async () => {
    try {
      await db.query(`CREATE TABLE IF NOT EXISTS 
        gifs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(128) NOT NULL,
            imageUrl VARCHAR(128) NOT NULL,
            createdAt timestamp with time zone NOT NULL,
            createdBy VARCHAR(128) NOT NULL
            )`
        );
    } catch (error) {
      console.log(error);
    }
  };
  createGifsTable();
};