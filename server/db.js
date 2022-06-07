const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "team",
    password: "osemudiame1",
    port: 5000,
});

pool.on('connect', () => {
  console.log('Database connected successfully!');
});

module.exports = pool;