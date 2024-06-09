const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'payment-service',
  password: 'keropi3',
  port: 5432,
});

module.exports = pool;
