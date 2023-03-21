const pool = require('./db');

module.exports = () => {
  const createNotificationsTable = async () => {
    try {
      await pool.query(`
                    DROP TABLE IF EXISTS article_notifications;
                    DROP TABLE IF EXISTS gif_notifications;

                    `);
    } catch (error) {
      console.log(error);
    }
  };

  createNotificationsTable();
};

// CREATE TABLE IF NOT EXISTS
//       article_notifications (
//                     id SERIAL PRIMARY KEY,
//                     created_at timestamp with time zone NOT NULL,
//                     article_id INTEGER NOT NULL,
//                     read BOOLEAN DEFAULT false NULL,
//                     post_author_id INTEGER NOT NULL,
//                     author_id INTEGER NOT NULL,
//                     notification_message CHARACTER VARYING,
//                     FOREIGN KEY (post_author_id)
//                     REFERENCES users (id),
//                     FOREIGN KEY (author_id)
//                     REFERENCES users (id)
//                     );
//       CREATE TABLE IF NOT EXISTS gif_notifications (
//                     id SERIAL PRIMARY KEY,
//                     created_at timestamp with time zone NOT NULL,
//                     gif_id INTEGER NOT NULL,
//                     read BOOLEAN DEFAULT false NULL,
//                     post_author_id INTEGER NOT NULL,
//                     author_id INTEGER NOT NULL,
//                     notification_message CHARACTER VARYING,
//                     FOREIGN KEY (post_author_id)
//                     REFERENCES users (id),
//                     FOREIGN KEY (author_id)
//                     REFERENCES users (id)
//                     )
