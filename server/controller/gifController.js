const cloudinary = require('cloudinary').v2;
const queries = require('../queries/gifQuery');
require('../models/gifModel')();
const pool = require('../models/db');


require('dotenv').config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


class GifController {
    
  static async createGif(req, res) {
        try {
            const { title, image} = req.body
          let imageURL;
          let publicId;
        await cloudinary.uploader.upload(image, (err, response) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: `Error uploading image`
                })
            }
            imageURL = response.secure_url;
            publicId = response.public_id
        })
         const created_at = new Date
         const userId = req.user.userId
         const values = [title, imageURL, publicId, created_at, userId];

        const images = await pool.query(queries.createNewGif, values)
          return  res.status(201).send({
                status: 'success',
                data: {
                  gifId: image.gif_id,
                  message: 'GIF image successfully posted',
                      images: images.rows[0],
                      imageUrl: image.image_url,
                }
              });
        }catch (err) {
        res.status(500).send({
        message:'Server Error',
        error: err.message
      });
      }

    }

    static async deleteGif(req, res) {
      try {
         const { gifId } = req.params;

        const gif = await pool.query(queries.selectGif,[gifId]);
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
        if (gif.rowCount === 0) return res.status(404).json({ message: 'Gif Not Found' });
        return res.status(202).json({
          status: 'success',
          data: {
            message: 'Gif post successfully deleted',
          },
        });
      } catch (err) {
        res.status(500).send({
        message:'Server Error',
        error: err.message
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
        message:'Server Error',
        error: err.message
      });
      }
  }


  static async getSingleGif(req, res) {
    try {
        const { gifId } = req.params;
        const gif = await pool.query(`SELECT * FROM gifs WHERE gif_id = ${gifId}`);
        if (gif.rows.length === 0) {
          return res.status(404).json({
            status: 'Failed',
            error: 'Gif with the specified gifId NOT found',
          });
        }
        return res.status(200).json({
          status: 'success',
          data: gif.rows[0],
        });
    } catch (err) {
        res.status(500).send({
          message:'Server Error',
          error: err.message
        });
     }
  }


}



module.exports = GifController;