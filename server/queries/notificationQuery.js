const createArticleNotification = `INSERT INTO article_notifications (
    article_id, created_at, post_author_id, author_id, notification_type, notification_message) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

const createGifNotification = `INSERT INTO gif_notifications (
    gif_id, created_at, post_author_id, author_id, notification_type, notification_message) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
const deleteArticleNotification = `
DELETE FROM article_notifications where article_id = $1 and notification_type = 'like'
`;

const deleteGifNotification = `
DELETE FROM gif_notifications where gif_id = $1 and notification_type = 'like'
`;

const getAllNotifications = `
SELECT
      n.id, 
      n.created_at as date,
      a.article as post, 
      a.id as postid,
      n.notification_message as message, 
      notification_read, 
      u2.profile_pix as author_pix,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM article_notifications n 
        LEFT JOIN articles a ON a.id = n.article_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1

      UNION ALL 

SELECT 
      n.id, 
      n.created_at as date,
      g.image_url as post, 
      g.id as postid,
      n.notification_message as message, 
      n.notification_read,
      u2.profile_pix as author_pix,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM gif_notifications n 
        LEFT JOIN gifs g ON g.id = n.gif_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1
          ORDER BY date DESC
`;

const totalUnreadNotifications = `
SELECT 
  (SELECT COUNT(*) from article_notifications where post_author_id = $1 and notification_read = false) + 
  (SELECT COUNT(*) FROM gif_notifications where post_author_id = $1 and notification_read = false) as total_unread_notifications
`;

const totalNotifications = `
SELECT 
  (SELECT COUNT(*) from article_notifications where post_author_id = $1) + 
  (SELECT COUNT(*) FROM gif_notifications where post_author_id = $1) as total_notifications
`;

const readArticleNotification =
  'UPDATE article_notifications SET notification_read =$1 WHERE id = $2 RETURNING *';

const readGifNotification =
  'UPDATE gif_notifications SET notification_read =$1 WHERE id = $2 RETURNING *';

const selectArticle = 'SELECT * FROM article_notifications WHERE id =$1';

const selectGif = 'SELECT * FROM gif_notifications WHERE id =$1';
const getArticleNotification = `
SELECT
      n.id, 
      n.created_at as date,
      a.article as post, 
      a.id as postid,
      n.notification_message as message, 
      notification_read, 
      u2.profile_pix as author_pix,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM article_notifications n 
        LEFT JOIN articles a ON a.id = n.article_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1 AND n.id =$2
`;

const getGifNotification = `
SELECT 
      n.id, 
      n.created_at as date,
      g.image_url as post, 
      g.id as postid,
      n.notification_message as message, 
      n.notification_read,
      u2.profile_pix as author_pix,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM gif_notifications n 
        LEFT JOIN gifs g ON g.id = n.gif_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1 AND n.id =$2
`;

module.exports = {
  createArticleNotification,
  createGifNotification,
  deleteArticleNotification,
  deleteGifNotification,
  getAllNotifications,
  totalUnreadNotifications,
  readArticleNotification,
  readGifNotification,
  selectArticle,
  selectGif,
  getArticleNotification,
  getGifNotification,
  totalNotifications,
};
