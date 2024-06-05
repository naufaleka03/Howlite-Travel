const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'howliteTravel',
  password: 'password',
  port: 5432,
});

// Fungsi untuk menguji koneksi database
const testConnection = async () => {
  try {
    await pool.connect();  // Mencoba untuk terhubung
    console.log('Koneksi ke database berhasil!');
  } catch (error) {
    console.error('Koneksi ke database gagal:', error);
  }
};

testConnection();

module.exports = pool;