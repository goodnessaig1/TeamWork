const getAllFeeds = `
SELECT a.article as post, a.title as title,a.created_at as post_date, a.id as postId,c.id as comment_id, c.comment as comment, c.created_at as date, CONCAT(u.first_name, ' ', u.last_name) as post_author,u2.profile_pix as comment_author_profile, u2.first_name as comment_author,u2.last_name as comment_author_last_name,u.jobrole as author_jobrole, u.profile_pix,
(SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.id) as number_of_commennt,
(SELECT COUNT(article_id) FROM articleLikes WHERE article_id = a.id) as number_of_likes,
EXISTS(SELECT * FROM articleLikes l WHERE l.article_id = a.id and l.author_id = $1) AS isLiked
FROM articles a
LEFT JOIN articles_comments c ON c.article_id = a.id
LEFT JOIN users u ON u.id = a.user_id
LEFT JOIN users u2 ON u2.id = c.author_id

UNION ALL

SELECT g.image_url as post, g.title as title,g.created_at as post_date, g.id as postId, c.id as comment_id, c.comment as comment, c.created_at as date, CONCAT(u.first_name, ' ', u.last_name) as post_author,u2.profile_pix as comment_author_profile, u2.first_name as comment_author,u2.last_name as comment_author_last_name,u.jobrole as author_jobrole, u.profile_pix,
(SELECT COUNT(gif_id) FROM gif_comment WHERE gif_id = g.id) as number_of_commennt,
(SELECT COUNT(gif_id) FROM gif_likes WHERE gif_id = g.id) as number_of_likes,
EXISTS(SELECT * FROM gif_likes l WHERE l.gif_id = g.id and l.author_id = $1) AS isLiked
FROM gifs g
LEFT JOIN gif_comment c ON c.gif_id = g.id
LEFT JOIN users u ON u.id = g.user_id
LEFT JOIN users u2 ON u2.id = c.author_id
ORDER BY post_date DESC, date DESC NULLS LAST
`;

module.exports = {
  getAllFeeds,
};
