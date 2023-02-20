const cloudinary = require('cloudinary').v2;
const queries = require('../queries/gifQuery');
require('../models/gifModel')();
const pool = require('../models/db');
const { DateTime } = require('luxon');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

class GifController {
  static async createGif(req, res) {
    try {
      const { title } = req.body;
      const image = req.files.image;
      let imageURL;
      let publicId;
      await cloudinary.uploader.upload(image.tempFilePath, (err, response) => {
        if (err) {
          return res.status(500).send({
            status: 'error',
            message: `Error uploading image`,
            error: err.message,
          });
        }
        imageURL = response.secure_url;
        publicId = response.public_id;
      });
      const created_at = DateTime.now();
      const userId = req.user.userId;
      const user = await pool.query(queries.selectUserDetails, [userId]);
      const values = [title, imageURL, publicId, created_at, userId];
      const images = await pool.query(queries.createNewGif, values);
      return res.status(201).send({
        status: 'success',
        message: 'GIF image successfully posted',
        data: {
          author_jobrole: user.rows[0].jobrole,
          comment: null,
          comment_author: null,
          comment_author_last_name: null,
          comment_author_profile: null,
          comment_id: null,
          date: null,
          isliked: false,
          number_of_commennt: '0',
          number_of_likes: '0',
          post: images.rows[0].image_url,
          post_author: `${user.rows[0].first_name}${user.rows[0].last_name}`,
          post_date: images.rows[0].created_at,
          postid: images.rows[0].id,
          profile_pix: user.rows[0].profile_pix,
          title: title,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async deleteGif(req, res) {
    try {
      const { gifId } = req.params;
      const gif = await pool.query(queries.selectGif, [gifId]);
      if (gif.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          error: 'Gif with the specified gifId NOT found',
        });
      }
      if (gif.rows[0].user_id !== req.user.userId) {
        return res.status(403).json({
          status: 'error',
          message: 'You cannot delete this Gif',
        });
      }
      await cloudinary.uploader.destroy(gif.rows[0].public_id);
      await pool.query(queries.deleteGif, [gifId]);
      if (gif.rowCount === 0)
        return res.status(404).json({ message: 'Gif Not Found' });
      return res.status(202).json({
        status: 'success',
        data: {
          message: 'Gif post successfully deleted',
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getAllgifs(req, res) {
    try {
      const gifs = await pool.query(queries.selectAllGifs);
      res.status(200).json({
        status: 'success',
        data: gifs.rows,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getSingleGif(req, res) {
    try {
      const { gifId } = req.params;
      const gif = await pool.query(queries.selectGif, [gifId]);
      const gifComment = await pool.query(queries.getGifComments, [gifId]);
      if (gif.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          error: 'Gif with the specified gifId NOT found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          id: gif.rows[0].id,
          createdAt: gif.rows[0].created_at,
          title: gif.rows[0].title,
          url: gif.rows[0].image_url,
          comments: gifComment.rows,
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

module.exports = GifController;
