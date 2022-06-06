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

const createTables = () => {
const gifsTable = `CREATE TABLE IF NOT EXISTS
    gifs(
      id SERIAL PRIMARY KEY,
      title VARCHAR(128) NOT NULL,
      imageUrl VARCHAR(128) NOT NULL,
      createdOn DATE NOT NULL );`;

pool.query(gifsTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  const users = `CREATE TABLE IF NOT EXISTS 
    users (
       Id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    address VARCHAR(255)
    )`;
  pool
    .query(users)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

}
module.exports = {
  pool,
  createTables
}