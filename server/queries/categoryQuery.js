const checkIfExist = 'SELECT * FROM categories WHERE category_name=$1';
const createNewCategory =
  'INSERT INTO categories ( category_name) VALUES ($1) RETURNING *';
const getAllCategories = 'SELECT * FROM categories';

module.exports = {
  checkIfExist,
  createNewCategory,
  getAllCategories,
};
