const createNewArticle = `INSERT INTO articles (title, article, flagged, created_at, updated_at, category_id, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const selectCategory = `SELECT * FROM categories WHERE category_id =$1`;


module.exports = {
  createNewArticle,
  selectCategory
};
