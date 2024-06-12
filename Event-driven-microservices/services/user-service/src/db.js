const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user-service',
  password: 'wildan123',
  port: 5432,
});

async function getUserData() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

module.exports = { getUserData };
module.exports = pool;
