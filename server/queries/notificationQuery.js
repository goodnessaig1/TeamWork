const createArticleNotification = `INSERT INTO article_notifications (
    article_id, created_at, post_author_id, author_id, notification_message) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
const createGifNotification = `INSERT INTO gif_notifications (
    gif_id, created_at, post_author_id, author_id, notification_message) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
// const createArticleLikeNotification = `INSERT INTO article_notifications (
//     article_id, created_at, post_author_id, author_id, message)
//         VALUES ($1, $2, $3, $4, $5) RETURNING *`;
// const createGifLikeNotification = `INSERT INTO gif_notifications (
//     gif_id, created_at, post_author_id, author_id, message)
//         VALUES ($1, $2, $3, $4, $5) RETURNING *`;
const getAllNotifications = `
SELECT n.created_at as date,a.article as post, n.message as message, read, CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
FROM article_notifications n 
LEFT JOIN articles a ON a.id = n.article_id
LEFT JOIN users u2 ON u2.id = n.author_id
where n.post_author_id =$1
UNION ALL 
SELECT n.created_at as date,g.image_url as post, n.message as message, read, CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
FROM gif_notifications n 
LEFT JOIN gifs g ON g.id = n.gif_id
LEFT JOIN users u2 ON u2.id = n.author_id
where n.post_author_id =$1
order by date desc
`;

module.exports = {
  createArticleNotification,
  createGifNotification,
  getAllNotifications,
};
