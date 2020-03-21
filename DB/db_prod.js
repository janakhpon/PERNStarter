const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.dbuser,
  password: process.env.dbpassword,
  host: process.env.dbhost,
  port: process.env.dbport,
  database: process.env.dbdatabase
});

module.exports = pool;
