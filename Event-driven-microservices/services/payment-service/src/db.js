const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
<<<<<<< HEAD
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
=======
  password: process.env.DB_PASSWORD,  
  port: process.env.DB_PORT,
});

console.log('Database password:', process.env.DB_PASSWORD);  
console.log('Type of DB_PASSWORD:', typeof process.env.DB_PASSWORD);

module.exports = pool;
>>>>>>> 7fe3f0bf312f4f91d08c1ad67cd2a7ecb5ded303
