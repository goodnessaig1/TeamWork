// SELECT *  FROM posts
// LEFT OUTER JOIN comments ON posts~post_id = comments~post_id;

// SELECT * FROM (
//     SELECT *,
//         ROW_NUMBER() OVER (PARTITION BY c.article_id ORDER BY c.article_id) comments_rn,
//         ROW_NUMBER() OVER (PARTITION BY a.user_id ORDER BY a.user_id) post_rn
//     FROM articles a
//     JOIN articles_comments c ON c.article_id = a.article_id
//     JOIN users u ON u.id = a.user_id
// ) t WHERE comment_id <= 3

// Select id, first_name, a.*, c.*
// from users u
//     join articles a on a.user_id = u.id
//        and (Select count(*) From articles
//             where user_id = u.id
//                and created_at <= a.created_at) <= 3
//     join articles_comments c on c.article_id = a.article_id
//        and (Select count(*) From articles_comments
//             where article_id = a.article_id
//                and created_at <= c.created_at) <= 3

// select  a.title, a.article,
//        jsonb_agg(c.comment) as comments
// from articles a left join
//      articles_comments c
//      using (article_id)
// group by a.article_id;

// SELECT articles.title,articles.article,
//     (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = articles.article_id) as number_of_commennt
// FROM articles
// JOIN users on articles.user_id = users.id

// ORDER BY article_id DESC

// select a.article, json_agg(to_json(c.comment))  as comment from  articles a FULL OUTER JOIN articles_comments c on  a.article_id = c.article_id GROUP BY a.article_id ORDER BY a.article_id

// //=====================    IMPORTANT ==================
// // SELECT a.article as post, a.title as title, a.article_id as postId, c.comment as comment, c.created_at, CONCAT(u.first_name, ' ', u.last_name) as post_author, u2.first_name as comment_author,u2.last_name as comment_author_last_name,u.jobrole as author_jobrole, u.profile_pix,
// // (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.article_id) as number_of_commennt
// // FROM articles a
// // LEFT JOIN articles_comments c ON c.article_id = a.article_id
// // LEFT JOIN users u ON u.id = a.user_id
// // LEFT JOIN users u2 ON u2.id = c.author_id
// // ORDER BY c.created_at DESC

// SELECT a.article as post, a.title as title, a.article_id as postId,c.author_id, c.comment as comment, c.created_at, CONCAT(u.first_name, ' ', u.last_name) as post_author, u2.first_name as comment_author,u2.last_name as comment_author_last_name,u.jobrole as author_jobrole, u.profile_pix,
// (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.article_id) as number_of_commennt
// FROM articles a
// LEFT JOIN articles_comments c ON c.article_id = a.article_id
// LEFT JOIN users u ON u.id = a.user_id
// LEFT JOIN users u2 ON u2.id = c.author_id
// ORDER BY c.created_at DESC

// select count(*)
// from posts
// inner join likes on posts.postid = likes.postid
// where postid = 7

// select len(likes) - len(replace(likes, ',', ''))
// from posts
// where postid = 7
