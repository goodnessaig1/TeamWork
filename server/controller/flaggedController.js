const pool = require('../models/db');
const queries = require('../queries/flagQuery');
const moment = require('moment');



class flagController {

static async flagArticles(req,res){
       try {
            const {articleId} = req.params
            const {flagged} = req.body

            const article = await pool.query(queries.selectArticle, [articleId]);

            if (article.rows.length === 0) {
        return res.status(404).json({
            status: 'Failed',
            message:  'Article with this id not found',
        });
        }
            if(!flagged){
                return res.status(404).json({
                    status: 'Error',
                    message: 'Not provided'
                })
            }
            const flaggedAt = moment().format('YYYY-MM-DD ');
            const flaged = await pool.query(queries.flag,  [flagged, flaggedAt, articleId])
            return res.status(200).json({
                status: 'success',
                message: 'This Article is considered inappropriate for our community. So it has been flagged by some of the users here on this platform. We would require you to delete it within the next 24hrs',
                flagged: flaged.rows[0].flagged,
                FlaggedAt : flaggedAt
            })
       } catch (err) {
          res.status(500).send({
          message:'Server Error',
          error: err.message
      })
    }
  }
}


module.exports = flagController