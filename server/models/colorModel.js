const pool = require('./db');

module.exports = () => {
  const createColorTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS
        colors (
          id serial PRIMARY KEY,
          color_name VARCHAR (50) UNIQUE NOT NULL,
          color VARCHAR (50) UNIQUE NOT NULL)       
          `);
    } catch (error) {
      console.log(error);
    }
  };
  createColorTable();
};
