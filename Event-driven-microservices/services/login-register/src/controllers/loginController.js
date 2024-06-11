const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool();

class User {
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

    async isValidPassword(password) {
        return bcrypt.compare(password, this.passwordHash);
    }

    generateJWT() {
        const jwtConfig = require('./jwt/config');
        return jwt.sign(
            { id: this.id, email: this.email },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );
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

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body.email, req.body.password); // Added console log for debugging
    if (!email || !password) {
        return res.status(400).render('login', { message: 'Email and password are required' });
    }
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).render('login', { message: 'Login failed' });
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).render('login', { message: 'Login failed' });
        }
        const token = user.generateJWT();
        res.render('login', { token });  // Render the login page with the token
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { message: 'Server error' });
    }
};
