const queries = require('../queries/gifQuery');
require('../models/gifModel')();
const pool = require('../models/db');
const { DateTime } = require('luxon');

require('dotenv').config();

class gifController {
  //    GIF COMMENT
  static async createComment(req, res) {
    try {
      const { comment } = req.body;
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
      const user = await pool.query(queries.selectUser, [userId]);
      const userName = user.rows[0].first_name;
      const values = [gifId, comment, userId, createdAt, userName];
      const gifComment = await pool.query(queries.createGifComment, values);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'GIF-COMMENT Successfully created',
          createdAt: createdAt,
          gifTitle: gif.rows[0].title,
          comment: comment,
          userName: userName,
          commentId: gifComment.rows[0].comment_id,
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
