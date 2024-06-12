const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

<<<<<<< HEAD
async function getUserData() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

module.exports = { getUserData };
module.exports = pool;
=======
module.exports = pool;
>>>>>>> 4545f89576532c08e8347839f6f9706b64f581ff
