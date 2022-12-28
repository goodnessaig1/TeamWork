/* eslint-disable consistent-return */
const pool = require('../models/db');
const queries = require('../queries/articleQuery');
const gifQuery = require('../queries/gifQuery');
require('../models/likesModel')();

require('dotenv').config();

class LikesController {
  static async articleLikes(req, res) {
    const { articleId } = req.params;
    const userId = req.user.userId;
    const article = await pool.query(queries.selectArticle, [articleId]);
    if (!article.rowCount > 0)
      return res
        .status(404)
        .send({ message: 'Post cannot be found or has been removed' });
    const values = [articleId, userId];
    const like = await pool.query(queries.selectIfUserLike, values);
    if (!like.rowCount > 0) {
      let newLike = await pool.query(queries.createLike, values);
      return res.json({
        newLike: newLike.rows,
      });
    } else {
      const deleteLike = await pool.query(queries.deleteLike, [userId]);
      return res.json({
        deleted: 'Like has been deleted',
        deleteLike,
      });
    }
  }

  // ========= GIF LIKE
  static async gifLike(req, res) {
    const { gifId } = req.params;
    const userId = req.user.userId;
    const gif = await pool.query(gifQuery.selectGif, [gifId]);
    if (!gif.rowCount > 0)
      return res
        .status(404)
        .send({ message: 'Gif cannot be found or has been removed' });
    const values = [gifId, userId];
    const like = await pool.query(gifQuery.selectIfUserLike, values);

    if (!like.rowCount > 0) {
      let newLike = await pool.query(gifQuery.createLike, values);
      return res.json({
        newLike: newLike.rows,
      });
    } else {
      const deleteLike = await pool.query(gifQuery.deleteLike, [userId]);
      return res.json({
        deleted: 'Like has been deleted',
        deleteLike,
      });
    }
  }
}

module.exports = LikesController;
