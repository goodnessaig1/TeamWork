const createNewArticle = `INSERT INTO articles (title, article, created_at, updated_at, category_id, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
const selectCategory = `SELECT * FROM categories WHERE category_id =$1`;

// FLAG QUERY
const selectArticle = 'SELECT * FROM articles WHERE id =$1';
const flag =
  'UPDATE articles SET flagged =$1, flagged_at =$2 WHERE id = $3 RETURNING *';

//UPDATE ARTICLE QUERY
const updateArticle =
  'UPDATE articles SET title = $1, article = $2, updated_at = $3 WHERE id = $4  RETURNING *';
const getAllArticles = `SELECT articles.id, title,user_id, article, first_name as username, category_id, articles.created_at, articles.updated_at, category_id, flagged, flagged_at FROM articles INNER JOIN users ON articles.user_id = users.id ORDER BY updated_at DESC`;
const getSingleArticle = `SELECT * FROM articles WHERE id = $1`;
const deleteSingleArticle = `DELETE FROM articles WHERE id = $1`;

// ARTCLE COMMENT QUERY
const getArticleComment =
  'SELECT articles_comments.article_id as commentId, comment, author_id as authorId FROM articles_comments WHERE article_id = $1';
const createComment =
  'INSERT INTO articles_comments (comment, created_at, article_id, flagged, author_id) VALUES ($1, $2, $3, $4, $5)RETURNING * ';

// ========= ARTICLE LIKES
const selectIfUserLike = `SELECT * FROM articleLikes where article_id = $1 and author_id = $2`;
const createLike =
  'INSERT INTO articleLikes (article_id, author_id) VALUES ($1, $2)RETURNING * ';
const deleteLike = `DELETE FROM articleLikes where author_id = $1`;

module.exports = {
  createNewArticle,
  selectCategory,
  selectArticle,
  flag,
  updateArticle,
  getAllArticles,
  getSingleArticle,
  getArticleComment,
  deleteSingleArticle,
  createComment,
  selectIfUserLike,
  createLike,
  deleteLike,
};
