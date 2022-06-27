const moment = require('moment');
const pool = require('../models/db');
const queries = require('../queries/articleQuery');
require('../models/articleModel')();
require("dotenv").config();
const { DateTime } = require("luxon");

const getTime = () => {
	const easternTime = DateTime.local();
	return easternTime.toLocaleString(DateTime.DATETIME_FULL);
};

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

  static async flagArticles(req,res){
       try {
            const {articleId} = req.params
            const {flagged} = req.body

            const article = await pool.query(queries.selectArticle, [articleId]);

            if (article.rows.length === 0) {
        return res.status(404).json({
            status: 'Failed',
            message:  'Article with this id not found',
        });
        }
            if(!flagged){
                return res.status(404).json({
                    status: 'Error',
                    message: 'Not provided'
                })
            }
            const flaggedAt = getTime();
            const flaged = await pool.query(queries.flag,  [flagged, flaggedAt, articleId])
            return res.status(200).json({
                status: 'success',
                message: 'This Article is considered inappropriate for our community. So it has been flagged by some of the users here on this platform. We would require you to delete it within the next 24hrs',
                flagged: flaged.rows[0].flagged,
                FlaggedAt : flaggedAt
            })
       } catch (err) {
          res.status(500).send({
          message:'Server Error',
          error: err.message
      })
    }
  }
}

module.exports = ArticleController;