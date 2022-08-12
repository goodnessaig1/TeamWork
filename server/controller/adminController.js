/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const pool = require('../models/db');
const queries = require('../queries/adminQuery');
const { createToken } = require('../utils/jwtGenerator');
require('../models/userModel')();

class UserController {
  // ADMIN AND EMPLOYEE REGISTER

  static async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        department,
        isAdmin,
        address,
      } = req.body;

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const createdAt = new Date();
      const updatedAt = new Date();
      let user = await pool.query(queries.checkIfUserExist, [
        email.toLowerCase(),
      ]);
      if (user.rowCount > 0) {
        return res.status(401).json({
          status: 'Failed',
          message: 'User with this email already exist',
        });
      }
      user = await pool.query(queries.createNewUser, [
        firstName,
        lastName,
        email.toLowerCase(),
        bcryptPassword,
        gender,
        jobRole,
        department,
        isAdmin,
        address,
        createdAt,
        updatedAt,
      ]);

      const token = createToken({
        email: user.rows[0].email,
        userId: user.rows[0].id,
      });
      res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token,
          userId: user.rows[0].id,
          createdAt: user.rows[0].created_at,
          updatedAt: user.rows[0].updated_at,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  //  LOGIN ROUTE

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      // eslint-disable-next-line prettier/prettier
      const user = await pool.query(queries.logInUser, [email.toLowerCase()]);
      if (user.rows.length === 0) {
        return res
          .json({ status: 'Failed', message: 'password or email incorrect' })
          .status(401);
      }
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!validPassword) {
        return res
          .json({ status: 'Failed', message: 'password is Incorrect' })
          .status(401);
      }

      const token = createToken({
        email: user.rows[0].email,
        userId: user.rows[0].id,
      });
      res.json({
        status: 'success',
        data: {
          message: 'You have succefully log in',
          token: token,
          userid: user.rows[0].id,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await pool.query(queries.getAllUsers);
      return res.status(200).json({
        status: 'Success',
        data: users.rows,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = UserController;
