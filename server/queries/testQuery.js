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

// const getArticlesFeed = `
// SELECT a.article as post, a.title as title, a.id as postId, c.comment as comment, c.created_at, CONCAT(u.first_name, ' ', u.last_name) as post_author,u2.profile_pix as comment_author_profile, u2.first_name as comment_author,u2.last_name as comment_author_last_name,u.jobrole as author_jobrole, u.profile_pix,
// (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.article_id) as number_of_commennt,
// (SELECT COUNT(article_id) FROM articleLikes WHERE article_id = a.article_id) as number_of_likes,
// EXISTS(SELECT * FROM articleLikes l WHERE l.article_id = a.article_id and l.author_id = $1) AS isLiked
// FROM articles a
// LEFT JOIN articles_comments c ON c.article_id = a.article_id
// LEFT JOIN users u ON u.id = a.user_id
// LEFT JOIN users u2 ON u2.id = c.author_id
// ORDER BY c.created_at DESC
// `;
// CREATE TABLE IF NOT EXISTS article_notifications (
//             id SERIAL PRIMARY KEY,
//             post_author_id INTEGER NOT NULL,
//             article_id INTEGER NOT NULL,
//             comment VARCHAR  NULL,
//             like VARCHAR  NULL,
//             author_names VARCHAR NOT NULL,
//             created_at timestamp with time zone NOT NULL,
//             author_id INTEGER NOT NULL,
//             read BOOLEAN DEFAULT false,
//             FOREIGN KEY (post_author_id)
//             REFERENCES users (id));

// SELECT n.created_at as date,a.article as post, n.comment as comment, n.article_like as like, read, CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
// FROM article_notifications n
// LEFT JOIN articles a ON a.id = n.article_id
// LEFT JOIN users u2 ON u2.id = n.author_id
// where n.post_author_id =2
// UNION ALL
// SELECT n.created_at as date,g.image_url as post, n.comment as comment, n.gif_like as like, read, CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
// FROM gif_notifications n
// LEFT JOIN gifs g ON g.id = n.gif_id
// LEFT JOIN users u2 ON u2.id = n.author_id
// where n.post_author_id =2
// order by date desc
// Get all posts with comments and likes
//   static async getAllFeeds(req, res) {
//     try {
//       const userId = req.user.userId;
//       const { offset, limit } = req.query;
//       const values = [userId, limit || 10, offset || 0];
//       const { rows } = await pool.query(queries.getAllFeeds, values);

//       // Create a map to group the rows by post ID
//       const postMap = new Map();
//       rows.forEach((row) => {
//         const {
//           postid,
//           title,
//           post,
//           post_date,
//           comment_id,
//           comment_body,
//           comment_created_at,
//           post_author,
//           profile_pix,
//           jobrole,
//           comment_author,
//           comment_author_profile,
//           number_of_comment,
//           number_of_likes,
//           liked,
//         } = row;
//         const postData = postMap.get(postid) || {
//           postid,
//           title,
//           post,
//           post_date,
//           post_author,
//           profile_pix,
//           jobrole,
//           number_of_comment,
//           number_of_likes,
//           liked,
//           comments: [],
//         };
//         if (comment_id) {
//           postData.comments.push({
//             id: comment_id,
//             body: comment_body,
//             created_at: comment_created_at,
//             comment_author: comment_author,
//             comment_author_profile: comment_author_profile,
//           });
//         }
//         postMap.set(postid, postData);
//       });

//       // Convert the map to an array of posts
//       const totalRows = await pool.query(queries.totalRows);
//       const posts = Array.from(postMap.values());
//       return res.status(200).json({
//         status: 'Success',
//         data: posts,
//         total: totalRows.rows[0],
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//     }
//   }
// SELECT
//         a.id as postid,
//         a.title as title,
//         a.article as post,
//         a.created_at as post_date,
//         c.id AS comment_id,
//         c.comment AS comment_body,
//         c.created_at AS comment_created_at,
//         CONCAT(u.first_name, ' ', u.last_name) as post_author,
//         u.profile_pix as profile_pix,
//         u.jobrole as jobrole,
// 		    CONCAT(u2.first_name, ' ', u2.last_name) as comment_author,
//         u2.profile_pix as comment_author_profile,
//         (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.id) as number_of_comment,
//         (SELECT COUNT(article_id) FROM articleLikes WHERE article_id = a.id) as number_of_likes,
//         EXISTS(SELECT * FROM articleLikes l WHERE l.article_id = a.id and l.author_id = $1) AS liked
//       FROM
//         articles a
//         LEFT JOIN articles_comments c ON a.id = c.article_id
//         LEFT JOIN users u ON u.id = a.user_id
//         LEFT JOIN users u2 ON u2.id = c.author_id

//         UNION ALL

// SELECT
//         g.id as postid,
//         g.title as title,
//         g.image_url as post,
//         g.created_at as post_date,
//         c.id AS comment_id,
//         c.comment AS comment_body,
//         c.created_at AS comment_created_at,
//         CONCAT(u.first_name, ' ', u.last_name) as post_author,
//         u.profile_pix as profile_pix,
//         u.jobrole as jobrole,
// 		    CONCAT(u2.first_name, ' ', u2.last_name) as comment_author,
//         u2.profile_pix as comment_author_profile,
//         (SELECT COUNT(gif_id) FROM gif_comment WHERE gif_id = g.id) as number_of_comment,
//         (SELECT COUNT(gif_id) FROM gif_likes WHERE gif_id = g.id) as number_of_likes,
//         EXISTS(SELECT * FROM gif_likes l WHERE l.gif_id = g.id and l.author_id = $1) AS liked
//       FROM
//         gifs g
//         LEFT JOIN gif_comment c ON c.gif_id = g.id
//         LEFT JOIN users u ON u.id = g.user_id
//         LEFT JOIN users u2 ON u2.id = c.author_id
//       ORDER BY
//         post_date DESC,
//         comment_created_at ASC
//       LIMIT $2 OFFSET $3

//         `;
