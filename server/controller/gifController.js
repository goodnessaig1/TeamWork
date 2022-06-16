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



}



module.exports = GifController;