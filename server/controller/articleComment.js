const pool = require('../models/db');
const queries = require('../queries/articleQuery');
const { DateTime } = require("luxon");
require('../models/articleComment')();



class ArticleCommentController {

    static async createComment(req, res) {

      try {
        const { comment, flagged } = req.body;
        const { articleId } = req.params;
        const createdAt = DateTime.now() ;
        const userId = req.user.userId

        const article = await pool.query(queries.selectArticle, [articleId]);
        if (article.rows.length === 0) {
          return res.status(404).json({
            status: 'Failed',
            error: 'Article with the specified ID NOT found',
          });
        }

        const userNames = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId]);

        const firstName = userNames.rows[0].first_name;
        const lastName = userNames.rows[0].last_name;
        
        const userName = firstName.replace(/\b\w/g, c => c. toUpperCase()) + " " + lastName.replace(/\b\w/g, c => c. toUpperCase())
        const values = [ comment, createdAt, articleId, flagged, userId, userName ]

        const articleComment = await pool.query(queries.createComment, values );
        return res.status(201).json({
          status: 'success',
          data: {
            message: 'Comment Successfully created',
            createdAt: createdAt,
            articleTitle: article.rows[0].title,
            article: article.rows[0].article,
            comment: comment,
            userName: userName,
            commentId: articleComment.rows[0].comment_id
          },
        });
      } catch (err) {
        res.status(500).send({
        message:'Server Error',
        error: err.message
      })
      }
  }
}


module.exports = ArticleCommentController;