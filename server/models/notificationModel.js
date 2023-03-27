const pool = require('./db');

module.exports = () => {
  const createNotificationsTable = async () => {
    try {
      await pool.query(`
      
            CREATE TABLE IF NOT EXISTS article_notifications (
                    id SERIAL PRIMARY KEY,
                    article_id INTEGER NOT NULL,
                    created_at timestamp with time zone NOT NULL,
                    post_author_id INTEGER NOT NULL,
                    author_id INTEGER NOT NULL,
                    notification_type VARCHAR(10) NOT NULL,
                    notification_message TEXT NOT NULL,
                    notification_read BOOLEAN NOT NULL DEFAULT false,
                    FOREIGN KEY (post_author_id)
                    REFERENCES users (id),
                    FOREIGN KEY (article_id)
                    REFERENCES articles (id),
                    FOREIGN KEY (author_id)
                    REFERENCES users (id)
                    );

            CREATE TABLE IF NOT EXISTS gif_notifications (
                    id SERIAL PRIMARY KEY,
                    gif_id INTEGER NOT NULL,
                    created_at timestamp with time zone NOT NULL,
                    post_author_id INTEGER NOT NULL,
                    author_id INTEGER NOT NULL,
                    notification_type VARCHAR(10) NOT NULL,
                    notification_message TEXT NOT NULL,
                    notification_read BOOLEAN NOT NULL DEFAULT false,
                    FOREIGN KEY (post_author_id)
                    REFERENCES users (id),
                    FOREIGN KEY (gif_id)
                    REFERENCES gifs (id),
                    FOREIGN KEY (author_id)
                    REFERENCES users (id)
                    );
      `);
    } catch (error) {
      console.log(error);
    }
  };
  createNotificationsTable();
};
