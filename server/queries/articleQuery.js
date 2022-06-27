const createNewArticle = `INSERT INTO articles (title, article, flagged, created_at, updated_at, category_id, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const selectCategory = `SELECT * FROM categories WHERE category_id =$1`;

// FLAG QUERY
const selectArticle = 'SELECT * FROM articles WHERE article_id =$1';
const flag = 'UPDATE articles SET flagged =$1, flagged_at =$2 WHERE article_id = $3 RETURNING *'


module.exports = {
  createNewArticle,
  selectCategory,
  selectArticle,
  flag
};
