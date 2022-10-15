/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const pool = require('../models/db');
const queries = require('../queries/adminQuery');
const { createToken } = require('../utils/jwtGenerator');
const cloudinary = require('cloudinary').v2;

require('../models/userModel')();
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
        return res
          .json({
            status: 'Failed',
            message: 'User with this email already exist',
          })
          .status(401);
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
      res
        .json({
          status: 'success',
          data: {
            message: 'User account successfully created',
            token,
            userId: user.rows[0].id,
            createdAt: user.rows[0].created_at,
            updatedAt: user.rows[0].updated_at,
          },
        })
        .status(201);
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

  static async userAuth(req, res) {
    try {
      const email = req.user.email;
      const user = await pool.query(queries.userAuth, [email]);
      return res.status(200).json({
        status: 'success',
        data: {
          userId: user.rows[0].id,
          firstName: user.rows[0].first_name,
          lastName: user.rows[0].last_name,
          profile: user.rows[0].profile_pix,
          coverPhoto: user.rows[0].cover_photo,
          number: user.rows[0].number,
          gender: user.rows[0].gender,
          jobRole: user.rows[0].jobrole,
          department: user.rows[0].department,
          isAdmin: user.rows[0].is_admin,
          address: user.rows[0].address,
          createdAt: user.rows[0].created_at,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async userProfilePix(req, res) {
    try {
      const profile = req.files.profile;
      const userId = req.user.userId;
      const user = await pool.query(queries.selectUserId, [userId]);
      if (user.rowCount === 0)
        return res.status(404).json({
          status: 'Failed',
          message: 'User Not Found',
        });
      if (user.rows[0].id !== req.user.userId) {
        return res.status(403).json({
          status: 'Failed',
          message: 'You cannot update this user account',
        });
      }
      let imageURL;
      await cloudinary.uploader.upload(
        profile.tempFilePath,
        (err, response) => {
          if (err) {
            return res.status(500).send({
              status: 'error',
              message: `Error uploading image`,
              error: err.message,
            });
          }
          imageURL = response.secure_url;
        }
      );
      const values = [imageURL, userId];
      const profilePix = await pool.query(queries.uploadPix, values);
      return res.status(201).send({
        status: 'success',
        data: {
          profile: profilePix.rows[0].profile_pix,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
  static async userCoverPhoto(req, res) {
    try {
      const photo = req.files.photo;
      const userId = req.user.userId;
      const user = await pool.query(queries.selectUserId, [userId]);
      if (user.rowCount === 0)
        return res.status(404).json({
          status: 'Failed',
          message: 'User Not Found',
        });
      if (user.rows[0].id !== req.user.userId) {
        return res.status(403).json({
          status: 'Failed',
          message: 'You cannot update this user account',
        });
      }
      let imageURL;
      await cloudinary.uploader.upload(photo.tempFilePath, (err, response) => {
        if (err) {
          return res.status(500).send({
            status: 'error',
            message: `Error uploading image`,
            error: err.message,
          });
        }
        imageURL = response.secure_url;
      });
      const values = [imageURL, userId];
      const coverPhoto = await pool.query(queries.coverPhoto, values);
      return res.status(201).send({
        status: 'success',
        data: {
          profile: coverPhoto.rows[0].cover_photo,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }

  static async phoneNumber(req, res) {
    try {
      const { number } = req.body;
      const { userId } = req.user;

      const user = await pool.query(queries.selectUserId, [userId]);
      if (user.rowCount === 0)
        return res.status(404).json({
          status: 'Failed',
          message: 'User Not Found',
        });
      if (user.rows[0].id !== req.user.userId) {
        return res.status(403).json({
          status: 'Failed',
          message: 'You cannot update this user account',
        });
      }
      const values = [number, userId];
      const phoneNumber = await pool.query(queries.phoneNumber, values);
      return res.status(201).json({
        status: 'success',
        data: {
          phoneNumber: phoneNumber.rows[0].number,
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

module.exports = UserController;
