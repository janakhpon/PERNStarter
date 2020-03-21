const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ssruser",
  password: "ssrpassword",
  host: "localhost",
  port: 5432,
  database: "ssr"
});

module.exports = pool;
