const selectArticle = 'SELECT * FROM articles WHERE article_id =$1';
const flag = 'UPDATE articles SET flagged =$1, flagged_at =$2 WHERE article_id = $3 RETURNING *'

module.exports = {
  selectArticle,
  flag
};
