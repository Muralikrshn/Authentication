const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'deals_db',
  password: 'Postgresql@123',
  port: 5432,
});

module.exports = pool