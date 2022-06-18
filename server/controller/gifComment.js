const queries = require('../queries/gifQuery');
const moment = require('moment');
require('../models/gifModel')();
const pool = require('../models/db');


class gifController {

     //    GIF COMMENT
    static async createComment(req, res){
      try {
        const { comment } = req.body;
        const { gifId } = req.params;
        const createdAt = moment().format('YYYY-MM-DD ');
        const userId = req.user.userId;

        const gif = await pool.query(`SELECT * FROM gifs WHERE gif_id = $1`,[gifId]);
        if (gif.rows.length === 0) {
        return res.status(404).json({
            status: 'error',
            error: 'Gif with the specified ID NOT found',
        });
        }
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId]);
        const userGif = await pool.query(`SELECT * FROM gifs WHERE user_id = $1`,[userId]);

        const userName = user.rows[0].first_name;
        const imgUrl = userGif.rows[0].image_url;
        const values = [gifId, comment, userId, createdAt,imgUrl, userName ];

        const gifComment =   await pool.query(queries.createGifComment, values);
        
           return res.status(201).json({
          status: 'success',
          data: {
              message: 'GIF-COMMENT Successfully created',
              createdAt: createdAt,
              comment : comment,
              imageURL: imgUrl,
              userName: userName,
              commentId: gifComment.rows[0].comment_id
            }
          });
      } catch (err) {
        res.status(500).send({
        message:'Server Error',
        error: err.message
      });
      }
    }

}

module.exports = gifController;