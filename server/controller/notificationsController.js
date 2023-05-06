const pool = require('../models/db');
const queries = require('../queries/notificationQuery');

class NotificationsController {
  static async getAllNotifications(req, res) {
    try {
      const userId = req.user.userId;
      const notifications = await pool.query(queries.getAllNotifications, [
        userId,
      ]);
      const totalUnreadNotifications = await pool.query(
        queries.totalUnreadNotifications,
        [userId]
      );
      const totalNotifications = await pool.query(queries.totalNotifications, [
        userId,
      ]);
      return res.status(200).json({
        status: 'Success',
        data: notifications.rows,
        totalUnread:
          totalUnreadNotifications.rows[0].total_unread_notifications,
        total: totalNotifications.rows[0].total_notifications,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async readArticleNotification(req, res) {
    try {
      const { notificationId } = req.params;
      const userId = req.user.userId;
      const notification = await pool.query(queries.selectArticle, [
        notificationId,
      ]);

      if (notification.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Notification with this id not found',
        });
      }
      const values = [true, notificationId];
      await pool.query(queries.readArticleNotification, values);
      const notificationValues = [userId, notificationId];
      const articleNotification = await pool.query(
        queries.getArticleNotification,
        notificationValues
      );
      const totalUnreadNotifications = await pool.query(
        queries.totalUnreadNotifications,
        [userId]
      );
      const totalNotifications = await pool.query(queries.totalNotifications, [
        userId,
      ]);
      return res.status(200).json({
        status: 'success',
        data: articleNotification.rows[0],
        totalUnread:
          totalUnreadNotifications.rows[0].total_unread_notifications,
        total: totalNotifications.rows[0].total_notifications,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async readGifNotification(req, res) {
    try {
      const { notificationId } = req.params;
      const userId = req.user.userId;
      const notification = await pool.query(queries.selectGif, [
        notificationId,
      ]);
      if (notification.rows.length === 0) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Notification with this id not found',
        });
      }
      const values = [true, notificationId];
      await pool.query(queries.readGifNotification, values);
      const notificationValues = [userId, notificationId];
      const gifNotification = await pool.query(
        queries.getGifNotification,
        notificationValues
      );
      const totalUnreadNotifications = await pool.query(
        queries.totalUnreadNotifications,
        [userId]
      );
      const totalNotifications = await pool.query(queries.totalNotifications, [
        userId,
      ]);
      return res.status(200).json({
        status: 'success',
        data: gifNotification.rows[0],
        totalUnread:
          totalUnreadNotifications.rows[0].total_unread_notifications,
        total: totalNotifications.rows[0].total_notifications,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = NotificationsController;
