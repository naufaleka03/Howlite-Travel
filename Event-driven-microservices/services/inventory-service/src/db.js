const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inventory-service',
  password: 'afif123',
  port: 5432,
});

module.exports = pool;