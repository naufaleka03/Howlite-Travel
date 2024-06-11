const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
    // Constructor and other methods...

    async hashPassword() {
        this.passwordHash = await bcrypt.hash(this.password, 10);
    }

    isValidPassword(password) {
        return bcrypt.compare(password, this.passwordHash);
    }

    generateJWT() {
        const jwtConfig = require('../jwt/config');
        return jwt.sign(
            { id: this.id, email: this.email },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );
    }
}

User.findByEmail = async (email) => {
    console.log(`Searching for user with email: ${email}`);
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('Query result:', result.rows);
    return result.rows[0];
};