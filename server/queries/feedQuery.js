const getAllFeeds = `
SELECT 
    postid, 
    title, 
    post, 
    post_date,
	color,
    color_id,
    post_author,
	user_id,
    isAdmin,
    profile, 
    jobrole, 
    number_of_comment, 
    number_of_likes, 
    liked, 
    comments
FROM 
    (SELECT  
        a.id as postid, 
        a.title as title, 
        a.article as post, 
        a.created_at as post_date,
	 	col.color,
	 	a.color_id as color_id,
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
	 	u.id as user_id,
        u.is_admin as isAdmin,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.id) as number_of_comment,
        (SELECT COUNT(article_id) FROM articleLikes WHERE article_id = a.id) as number_of_likes,
        EXISTS(SELECT * FROM articleLikes l WHERE l.article_id = a.id and l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT 
                ac.id, 
                ac.comment, 
                ac.created_at as comment_date,
                u.is_admin as isAdmin, 
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
	 	LEFT JOIN colors col ON col.id = a.color_id
    UNION ALL
    SELECT
        g.id as postid, 
        g.title as title, 
        g.image_url as post, 
        g.created_at as post_date, 
	 	NULL as color,
	 	NULL as color_id,
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
	 	u.id as user_id,
        u.is_admin as isAdmin,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(gif_id) FROM gif_comment  WHERE gif_id = g.id) as number_of_comment,
        (SELECT COUNT(gif_id) FROM gif_likes WHERE gif_id = g.id) as number_of_likes,
        EXISTS(SELECT * FROM gif_likes l WHERE l.gif_id = g.id and l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT 
                gc.id, 
                gc.comment, 
                gc.created_at as comment_date,
                u.is_admin as isAdmin, 
                CONCAT(u.first_name, ' ', u.last_name) as comment_author,
                u.profile_pix as comment_author_profile
            FROM 
                gif_comment gc 
                JOIN users u ON u.id = gc.author_id 
            WHERE 
                gc.gif_id = g.id 
            ORDER BY 
                gc.created_at DESC 
            LIMIT 
                3
        ) c) as comments
    FROM 
        gifs g
        LEFT JOIN users u ON u.id = g.user_id
    ) subquery
ORDER BY 
    post_date DESC
LIMIT 
    $2 OFFSET $3
`;

const totalRows = `
SELECT 
  (SELECT COUNT(*) FROM articles) + 
  (SELECT COUNT(*) FROM gifs) as TotalRows;
`;

module.exports = {
  getAllFeeds,
  totalRows,
};
