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
      image_url VARCHAR(128) NOT NULL,
      created_on DATE NOT NULL
    )`;

pool.query(gifsTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

}
module.exports ={ pool,
    createTables
};