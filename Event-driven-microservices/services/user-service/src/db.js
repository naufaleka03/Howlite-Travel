const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user-service',
  password: 'wildan123',
  port: 5432,
});

module.exports = pool;
