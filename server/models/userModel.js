const db = require("./db");

module.exports = () => {
  const createGenresTable = async () => {
    try {
      await db.query(`CREATE TABLE IF NOT EXISTS (
      users 
      Id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    address VARCHAR(255)
    )`);
    } catch (error) {
      console.log(error);
    }
  };
  createGenresTable();
};