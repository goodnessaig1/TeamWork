const pool = require('../models/db');

const createTable = pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    is_admin BOOLEAN NOT NULL DEFAULT false,
    address VARCHAR(255),
    created_at  DATE NOT NULL,
    updated_at  DATE NOT NULL);

  CREATE TABLE IF NOT EXISTS gifs (
        gif_id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        public_id VARCHAR NOT NULL,
        created_at timestamp with time zone NOT NULL,
        user_id SERIAL NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users (id));
      
    CREATE TABLE IF NOT EXISTS gif_comment (
          gif_id INTEGER NOT NULL,
          comment_id SERIAL PRIMARY KEY,
          comments VARCHAR NOT NULL,        
          created_at timestamp with time zone NOT NULL,
          created_by VARCHAR NOT NULL,
          user_id INTEGER NOT NULL,
          img_url character varying,
          user_name  VARCHAR(255) NOT NULL,
          FOREIGN KEY (user_id) 
          REFERENCES users (id));
          

  `);
module.exports = createTable