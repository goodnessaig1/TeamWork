const pool = require('../models/db');
const queries = require('../queries/articleQuery');
const notificationQuery = require('../queries/notificationQuery');
const { DateTime } = require('luxon');
require('../models/articleComment')();
require('../models/notificationModel')();

class ArticleCommentController {
  static async createComment(req, res) {
    try {
      const { comment, flagged, commentNotification } = req.body;
      const { articleId } = req.params;
      const createdAt = DateTime.now();
      const userId = req.user.userId;
      const article = await pool.query(queries.selectArticle, [articleId]);
      if (article.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          error: 'Article with the specified ID NOT found',
        });
      }
      const postAuthor = article.rows[0].user_id;
      const values = [comment, createdAt, articleId, flagged, userId];
      await pool.query(queries.createComment, values);

      const notificationValues = [
        articleId,
        createdAt,
        postAuthor,
        userId,
        commentNotification || 'commented on your post',
      ];

      if (userId !== postAuthor) {
        await pool.query(
          notificationQuery.createArticleNotification,
          notificationValues
        );
      }
      const getArticleData = await pool.query(queries.getUpdatedArticle, [
        userId,
        articleId,
      ]);
      const articleComment = await pool.query(queries.getArticleComment, [
        articleId,
      ]);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment Successfully created',
          data: getArticleData.rows[0],
          comment: articleComment.rows[0],
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

module.exports = ArticleCommentController;
