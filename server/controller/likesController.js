/* eslint-disable consistent-return */
const pool = require('../models/db');
const queries = require('../queries/articleQuery');
const gifQuery = require('../queries/gifQuery');
const { DateTime } = require('luxon');

require('../models/likesModel')();

require('dotenv').config();

class LikesController {
  static async articleLikes(req, res) {
    const { articleId } = req.params;
    const userId = req.user.userId;
    const createdAt = DateTime.now();
    const article = await pool.query(queries.selectArticle, [articleId]);
    if (!article.rowCount > 0)
      return res
        .status(404)
        .send({ message: 'Post cannot be found or has been removed' });
    const likes = '1';
    const like = await pool.query(queries.selectIfUserLike, [articleId]);
    const values = [likes, createdAt, articleId, userId];
    var data = like.rows.map((user) => {
      return user.author_id;
    });
    if (!data.includes(userId)) {
      let newLike = await pool.query(queries.createLike, values);
      return res.json({
        newLike: newLike.rows,
      });
    } else {
      const deleteLike = await pool.query(queries.deleteLike, [userId]);
      return res.json({
        deleted: deleteLike.rows,
      });
    }
  }

  // ========= GIF LIKE
  static async gifLike(req, res) {
    const { gifId } = req.params;
    const userId = req.user.userId;
    const createdAt = DateTime.now();
    const gif = await pool.query(gifQuery.selectGif, [gifId]);

    if (!gif.rowCount > 0)
      return res
        .status(404)
        .send({ message: 'Gif cannot be found or has been removed' });
    const likes = '1';
    const like = await pool.query(gifQuery.selectIfUserLike, [gifId]);
    const values = [likes, createdAt, gifId, userId];
    var data = like.rows.map((user) => {
      return user.author_id;
    });

    if (!data.includes(userId)) {
      let newLike = await pool.query(gifQuery.createLike, values);
      return res.json({
        newLike: newLike.rows,
      });
    } else {
      const deleteLike = await pool.query(gifQuery.deleteLike, [userId]);
      return res.json({
        deleted: deleteLike.rows,
      });
    }
  }
}

module.exports = LikesController;
