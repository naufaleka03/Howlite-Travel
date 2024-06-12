const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db'); // Ensure pool is exported from db.js
const jwtConfig = require('../jwt/config');

class User {
    constructor(userRow) {
        this.id = userRow.id;
        this.email = userRow.email;
        this.passwordHash = userRow.password_hash;
    }

    async hashPassword() {
        this.passwordHash = await bcrypt.hash(this.password, 10);
    }

    isValidPassword(password) {
        return bcrypt.compare(password, this.passwordHash);
    }

    generateJWT() {
        return jwt.sign(
            { id: this.id, email: this.email },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return new User(result.rows[0]);
        } else {
            return null;
        }
    }

    static async create(email, passwordHash) {
        const result = await pool.query(
            'INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING *',
            [email, passwordHash]
        );
        return new User(result.rows[0]);
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

module.exports = { User, Token };
