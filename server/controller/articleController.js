/* eslint-disable import/no-unresolved */
const pool = require('../models/db');
const queries = require('../queries/articleQuery');
const { DateTime } = require('luxon');

require('../models/articleModel')();
require('dotenv').config();

class ArticleController {
  static async createArticle(req, res) {
    try {
      const { title, article, categoryId } = req.body;
      const category = await pool.query(queries.selectCategory, [categoryId]);
      const { userId } = req.user;
      if (category.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Category with the specified categoryId NOT found',
        });
      }
      const createdAt = DateTime.now();
      const updatedAt = DateTime.now();
      const user = await pool.query(queries.selectUserDetails, [userId]);
      const values = [title, article, createdAt, updatedAt, categoryId, userId];
      const articles = await pool.query(queries.createNewArticle, values);
      const articleId = articles.rows[0].id;
      const newArticle = await pool.query(queries.getUpdatedArticle, [
        userId,
        articleId,
      ]);

      return res.status(201).json({
        status: 'success',
        message: 'Article successfully posted',
        data: newArticle.rows[0],
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async flagArticles(req, res) {
    try {
      const { articleId } = req.params;
      const { flagged } = req.body;
      const article = await pool.query(queries.selectArticle, [articleId]);
      if (article.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Article with this id not found',
        });
      }
      if (!flagged) {
        return res.status(404).json({
          status: 'Error',
          message: 'Not provided',
        });
      }
      const flaggedAt = DateTime.now();
      const flaged = await pool.query(queries.flag, [
        flagged,
        flaggedAt,
        articleId,
      ]);
      return res.status(200).json({
        status: 'success',
        message:
          'This Article is considered inappropriate for our community. So it has been flagged by some of the users here on this platform. We would require you to delete it within the next 24hrs',
        flagged: flaged.rows[0].flagged,
        FlaggedAt: flaggedAt,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async updateArticle(req, res) {
    try {
      const { articleId } = req.params;
      const { title, article } = req.body;
      const user = await pool.query(queries.selectArticle, [articleId]);
      if (user.rowCount === 0)
        return res.status(404).json({
          status: 'Failed',
          message: 'Article Not Found',
        });
      if (user.rows[0].user_id !== req.user.userId) {
        return res.status(403).json({
          status: 'Failed',
          message: 'You cannot update this article',
        });
      }
      const updatedAt = DateTime.now();
      const updatedArticle = await pool.query(queries.updateArticle, [
        title,
        article,
        updatedAt,
        articleId,
      ]);

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully updated',
          title: updatedArticle.rows[0].title,
          article: updatedArticle.rows[0].article,
          updatedAt: updatedAt,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getAllArticles(req, res) {
    try {
      const articles = await pool.query(queries.getAllArticles);
      return res.status(200).json({
        status: 'Success',
        data: articles.rows,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getSingleArticle(req, res) {
    try {
      const { articleId } = req.params;
      const article = await pool.query(queries.getSingleArticle, [articleId]);
      const comments = await pool.query(queries.getArticleComment, [articleId]);
      if (article.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          error: 'Article with the specified articleId NOT found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          id: article.rows[0].id,
          createdAt: article.rows[0].created_at,
          title: article.rows[0].title,
          article: article.rows[0].article,
          articleAuthor: article.rows[0].user_id,
          comments: comments.rows,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getArticleComment(req, res) {
    try {
      const { articleId } = req.params;
      const article = await pool.query(queries.getSingleArticle, [articleId]);
      const comments = await pool.query(queries.getArticleComment, [articleId]);
      if (article.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          error: 'Article with the specified articleId NOT found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          comments: comments.rows,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async deleteSingleArticle(req, res) {
    try {
      const { articleId } = req.params;
      const user = await pool.query(queries.selectArticle, [articleId]);
      if (user.rowCount === 0)
        return res.status(404).json({ message: 'Article Not Found' });
      if (user.rows[0].user_id !== req.user.userId) {
        return res.status(403).json({
          status: 'Failed',
          message: 'You cannot delete this article',
        });
      }

      await pool.query(queries.deleteSingleArticle, [articleId]);
      return res.status(202).json({
        status: 'success',
        data: {
          message: 'Article succesfully deleted',
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = ArticleController;
