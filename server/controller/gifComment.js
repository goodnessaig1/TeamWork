const queries = require('../queries/gifQuery');
const notificationQuery = require('../queries/notificationQuery');
require('../models/gifModel')();
const pool = require('../models/db');
const { DateTime } = require('luxon');

require('dotenv').config();

class gifController {
  //    GIF COMMENT
  static async createComment(req, res) {
    try {
      const { comment, commentNotification } = req.body;
      const { gifId } = req.params;
      const createdAt = DateTime.now();
      const userId = req.user.userId;
      const gif = await pool.query(queries.selectGif, [gifId]);
      if (gif.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'Gif with the specified ID NOT found',
        });
      }
      const postAuthor = gif.rows[0].user_id;
      const user = await pool.query(queries.selectUser, [userId]);
      const userName = user.rows[0].first_name;
      const values = [gifId, comment, userId, createdAt, userName];
      await pool.query(queries.createGifComment, values);
      const notificationValues = [
        gifId,
        createdAt,
        postAuthor,
        userId,
        commentNotification || 'commented on your photo',
      ];
      if (userId !== postAuthor) {
        await pool.query(
          notificationQuery.createGifNotification,
          notificationValues
        );
      }
      const updatedGif = await pool.query(queries.getUpdatedGif, [
        userId,
        gifId,
      ]);
      const gifComment = await pool.query(queries.getGifComments, [gifId]);
      const lastIndex = gifComment.rowCount - 1;
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'GIF-COMMENT Successfully created',
          data: updatedGif.rows[0],
          comment: gifComment.rows[lastIndex],
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

module.exports = gifController;
