const pool = require('../models/db');
const queries = require('../queries/colorQuery');

require('../models/colorModel')();

class colorController {
  static async createColor(req, res) {
    try {
      const { colorName, color } = req.body;
      const colors = await pool.query(queries.checkIfExist, [color]);
      if (colors.rowCount > 0) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'Color already exists',
          },
        });
      }
      const createColor = await pool.query(queries.createNewColor, [
        colorName,
        color,
      ]);
      return res.status(201).json({
        status: 'success',
        message: 'Color Successfully created',
        colorId: createColor.rows[0].id,
        colorName: createColor.rows[0].color_name,
        color: createColor.rows[0].color,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getAllColors(req, res) {
    try {
      const colors = await pool.query(queries.getAllColors);
      return res.status(200).json({
        status: 'Success',
        data: colors.rows,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async deleteSingleColor(req, res) {
    try {
      const { colorId } = req.params;
      const color = await pool.query(queries.selectSingleColor, [colorId]);
      if (color.rowCount === 0)
        return res.status(404).json({ message: 'Color Not Found' });
      await pool.query(queries.deleteSingleColor, [colorId]);
      return res.status(202).json({
        status: 'success',
        data: {
          message: 'Color succesfully deleted',
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = colorController;
