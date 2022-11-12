require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
// var pg = require('pg');

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
