/* eslint-disable consistent-return */
const pool = require('../models/db');
const queries = require('../queries/articleQuery');
const gifQuery = require('../queries/gifQuery');
const notificationQuery = require('../queries/notificationQuery');
const { DateTime } = require('luxon');
require('../models/likesModel')();
require('dotenv').config();

class LikesController {
  static async articleLikes(req, res) {
    const { articleId } = req.params;
    const { likeNotification } = req.body;
    const userId = req.user.userId;
    const article = await pool.query(queries.selectArticle, [articleId]);
    if (!article.rowCount > 0)
      return res
        .status(404)
        .send({ message: 'Post cannot be found or has been removed' });
    const createdAt = DateTime.now();
    const postAuthor = article.rows[0].user_id;
    const values = [articleId, userId];
    const like = await pool.query(queries.selectIfUserLike, values);
    const notificationValues = [
      articleId,
      createdAt,
      postAuthor,
      userId,
      likeNotification || 'Liked your post..',
    ];
    if (!like.rowCount > 0) {
      let newLike = await pool.query(queries.createLike, values);
      const article = await pool.query(queries.getUpdatedArticle, [
        userId,
        articleId,
      ]);
      if (userId !== postAuthor) {
        await pool.query(
          notificationQuery.createArticleLikeNotification,
          notificationValues
        );
      }
      return res.json({
        newLike: newLike.rows,
        data: article.rows[0],
      });
    } else {
      await pool.query(queries.deleteLike, [userId]);
      const article = await pool.query(queries.getUpdatedArticle, [
        userId,
        articleId,
      ]);
      return res.json({
        deleted: 'Like has been deleted',
        data: article.rows[0],
      });
    }
  }

  // ========= GIF LIKE
  static async gifLike(req, res) {
    const { likeNotification } = req.body;
    const { gifId } = req.params;
    const userId = req.user.userId;
    const gif = await pool.query(gifQuery.selectGif, [gifId]);
    if (!gif.rowCount > 0)
      return res
        .status(404)
        .send({ message: 'Gif cannot be found or has been removed' });
    const createdAt = DateTime.now();
    const postAuthor = gif.rows[0].user_id;
    const values = [gifId, userId];
    const like = await pool.query(gifQuery.selectIfUserLike, values);
    const notificationValues = [
      gifId,
      createdAt,
      postAuthor,
      userId,
      likeNotification || 'Liked your photo..',
    ];
    if (!like.rowCount > 0) {
      let newLike = await pool.query(gifQuery.createLike, values);
      const gif = await pool.query(gifQuery.getUpdatedGif, [userId, gifId]);
      if (userId !== postAuthor) {
        await pool.query(
          notificationQuery.createGifLikeNotification,
          notificationValues
        );
      }
      return res.json({
        newLike: newLike.rows,
        data: gif.rows[0],
      });
    } else {
      await pool.query(gifQuery.deleteLike, [userId]);
      const gif = await pool.query(gifQuery.getUpdatedGif, [userId, gifId]);
      return res.json({
        deleted: 'Like has been deleted',
        data: gif.rows[0],
      });
    }
  }
}

module.exports = LikesController;
