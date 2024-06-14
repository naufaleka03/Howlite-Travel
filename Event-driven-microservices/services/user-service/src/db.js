const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function getUserData() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

module.exports = { getUserData };
module.exports = pool;
