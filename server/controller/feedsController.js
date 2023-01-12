const pool = require('../models/db');
const queries = require('../queries/feedQuery');

class FeedsController {
  static async getAllFeeds(req, res) {
    try {
      const userId = req.user.userId;
      const offset = req.query.offset;
      const feeds = await pool.query(queries.getAllFeeds, [userId, offset]);
      return res.status(200).json({
        status: 'Success',
        data: feeds.rows,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getArticlesFeeds(req, res) {
    try {
      const feeds = await pool.query(queries.getArticlesFeed);
      return res.status(200).json({
        status: 'Success',
        data: feeds.rows,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = FeedsController;
