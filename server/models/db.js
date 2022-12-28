require('dotenv').config();
const { Pool } = require('pg');

console.log(`This is a ${process.env.NODE_ENV} environment`);

let pool;
const connectionString = process.env.DATABASE_URL;
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
