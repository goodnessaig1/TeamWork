// var client = new pg.Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'team',
//   password: 'osemudiame1',
//   port: 5432,
// });
// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log('Database Connected');
//   });
// });

// module.exports = client;

// import dotenv from 'dotenv';
// import { Pool } from 'pg';
const { Pool } = require('pg');
require('dotenv').config();

console.log(`This is a ${process.env.NODE_ENV} environment`);

let pool;
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const testConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/team`;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production',
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'team',
    password: 'osemudiame1',
    port: 5432,
  });
} else {
  pool = new Pool({
    connectionString,
  });
}

if (!pool) {
  console.log('Database Setup  Was Unsuccessful');
  process.exit(1);
} else {
  pool.on('connect', () => {
    console.log('connected to the Database Successfully');
  });
}

module.exports = pool;
