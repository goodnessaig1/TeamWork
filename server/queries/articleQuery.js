const createNewArticle = `INSERT INTO articles (title, article, created_at, updated_at, category_id, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
const selectCategory = `SELECT * FROM categories WHERE category_id =$1`;

// FLAG QUERY
const selectArticle = 'SELECT * FROM articles WHERE article_id =$1';
const flag = 'UPDATE articles SET flagged =$1, flagged_at =$2 WHERE article_id = $3 RETURNING *'

//UPDATE ARTICLE QUERY
const updateArticle = "UPDATE articles SET title = $1, article = $2, updated_at = $3 WHERE article_id = $4  RETURNING *"
// GET ALL ARTICLES
const getAllArticles =`SELECT article_id, title,user_id, article, first_name as username, category_id, articles.created_at, articles.updated_at, category_id, flagged, flagged_at FROM articles JOIN users ON articles.user_id = users.id ORDER BY updated_at DESC`
// GET ALL ARTICLES
const getSingleArticle = `SELECT * FROM articles WHERE article_id = $1`
// DELETE A PARTICLE ARTICLES
const deleteSingleArticle = `DELETE FROM articles WHERE article_id = $1`



module.exports = {
  createNewArticle,
  selectCategory,
  selectArticle,
  flag,
  updateArticle,
  getAllArticles,
  getSingleArticle,
  deleteSingleArticle
};
