const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'booking-service',
  password: 'dragoncity1',
  port: 5432,
});

module.exports = pool;
