const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,  // Ensure this is a string
    port: process.env.DB_PORT,
});

console.log('Database password:', process.env.DB_PASSWORD);  // Check what this outputs
console.log('Type of DB_PASSWORD:', typeof process.env.DB_PASSWORD);

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully!');
    client.release();
});

const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwt/config');  // Adjust the path as necessary

class User {
    static async create(email, passwordHash) {
        const result = await pool.query(
            'INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING *',
            [email, passwordHash]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (result.rows.length > 0) {
            return new User(result.rows[0]);
        } else {
            return null;
        }
    }

    async hashPassword() {
        this.passwordHash = await bcrypt.hash(this.password, 10);
    }

    isValidPassword(password) {
        return bcrypt.compare(password, this.passwordHash);
    }

    generateJWT() {
        if (!jwtConfig.secret) {
            throw new Error("JWT secret key is not set.");
        }
        return jwt.sign({ email: this.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    }
}

class Token {
    static async storeToken(userId, token) {
        const result = await pool.query(
            'INSERT INTO tokens(user_id, token) VALUES($1, $2) RETURNING *',
            [userId, token]
        );
        return result.rows[0];
    }
}

module.exports = { User, Token };  // Export User and Token classes
