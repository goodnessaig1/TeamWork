const moment = require('moment');
const pool = require('../models/db');
const queries = require('../queries/articleQuery');
require('../models/articleModel')();


class ArticleController {
  static async createArticle(req, res) {
      try {
          const { title, article, categoryId } = req.body;
          let {flagged} = req.body

          const category = await pool.query(queries.selectCategory, [categoryId]);

          if (category.rows.length === 0) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Category with the specified categoryId NOT found',
      });
    }
     if(!flagged){
        flagged = false
    }

    const createdAt = moment().format('YYYY-MM-DD ');
    const updatedAt = moment().format('YYYY-MM-DD ');

    const { userId } = req.user;
    const values = [title, article, flagged, createdAt,updatedAt, categoryId, userId]
    const articles = await pool.query(queries.createNewArticle, values,
  );
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: articles.rows[0].article_id,
          createdAt: createdAt,
          title: title,
          cagigoryName: category.rows[0].category_name
        }
    });
       } catch (err) {
      res.status(500).send({
        message:'Server Error',
        error: err.message
      })
    }
  }
}

module.exports = ArticleController;