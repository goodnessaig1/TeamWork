const pool = require('../models/db');
const queries = require('../queries/categoryQuery');

// require('../models/categoryModel')();

class categoryController {
  static async createCategory(req, res) {
    try {
      const { categoryName } = req.body;
      const category = await pool.query(queries.checkIfExist, [categoryName]);
      if (category.rowCount > 0) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'Category already exists',
          },
        });
      }
      const categories = await pool.query(queries.createNewCategory, [
        categoryName,
      ]);
      return res.status(201).json({
        status: 'success',
        message: 'Category Successfully created',
        categoryId: categories.rows[0].category_id,
        categoryName: categoryName,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = categoryController;
