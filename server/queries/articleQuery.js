const createNewArticle = `INSERT INTO articles (title, article, created_at, updated_at, category_id, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
const selectCategory = `SELECT * FROM categories WHERE category_id =$1`;
const selectUserDetails = 'SELECT * FROM users WHERE id =$1';
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
const getArticleComment = `SELECT c.article_id as post_id, c.comment, c.created_at as date, c.author_id as authorId, CONCAT(u.first_name, ' ', u.last_name) as post_author,
u.profile_pix as comment_author_profile 
FROM articles_comments c
LEFT JOIN users u ON u.id = c.author_id
WHERE article_id = $1 ORDER BY c.created_at DESC`;
const createComment =
  'INSERT INTO articles_comments (comment, created_at, article_id, flagged, author_id) VALUES ($1, $2, $3, $4, $5)RETURNING * ';

// ========= ARTICLE LIKES
const selectIfUserLike = `SELECT * FROM articleLikes where article_id = $1 and author_id = $2`;
const createLike =
  'INSERT INTO articleLikes (article_id, author_id)  VALUES ($1, $2) ';
const deleteLike = `DELETE FROM articleLikes where author_id = $1`;
const getUpdatedArticle = `
   SELECT
        a.id as postid, 
        a.title as title, 
        a.article as post, 
        a.created_at as post_date, 
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(article_id) FROM articles_comments  WHERE article_id = a.id) as number_of_comment,
        (SELECT COUNT(article_id) FROM articlelikes WHERE article_id = a.id) as number_of_likes,
        EXISTS(SELECT * FROM articlelikes l WHERE l.article_id = a.id and l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT 
                ac.id, 
                ac.comment, 
                ac.created_at as comment_date, 
                CONCAT(u.first_name, ' ', u.last_name) as comment_author,
                u.profile_pix as comment_author_profile
            FROM 
                articles_comments ac 
                JOIN users u ON u.id = ac.author_id 
            WHERE 
                ac.article_id = a.id 
            ORDER BY 
                ac.created_at DESC 
            LIMIT 
                3
        ) c) as comments
    FROM 
         articles a
        LEFT JOIN users u ON u.id = a.user_id
    WHERE a.id= $2
`;
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
  selectUserDetails,
  getUpdatedArticle,
};
