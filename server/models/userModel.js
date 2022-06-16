const pool = require("./db");

module.exports = () => {
  const createGenresTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS (
      users 
      id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    is_admin BOOLEAN NOT NULL DEFAULT false,
    address VARCHAR(255),
    created_at  DATE NOT NULL,
    updated_at  DATE NOT NULL
    )`);
    } catch (error) {
      console.log(error);
    }
  };
  createGenresTable();
};