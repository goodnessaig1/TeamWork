var pg = require("pg");
// const { Pool, client } = require("pg");

// var conString = process.env.DB_URL;
var client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "team",
    password: "osemudiame1",
    port: 5000,
});;
client.connect(function(err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Database Connected");
  });
});

module.exports = client;