const pool = require("./db");

module.exports = () => {
  const createCategoryTable = async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS 
        categories (
          category_id serial PRIMARY KEY, 
          category_name VARCHAR (50) UNIQUE NOT NULL)`
        );
    } catch (error) {
      console.log(error);
    }
  };
  createCategoryTable();
};
