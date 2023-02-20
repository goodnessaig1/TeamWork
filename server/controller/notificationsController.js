const pool = require('../models/db');
const queries = require('../queries/notificationQuery');

class NotificationsController {
  static async getAllNotifications(req, res) {
    try {
      const userId = req.user.userId;
      //   const { offset, limit } = req.query;
      //   const values = [userId, limit || 10, offset || 0];
      const notifications = await pool.query(queries.getAllNotifications, [
        userId,
      ]);
      return res.status(200).json({
        status: 'Success',
        data: notifications.rows,
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
