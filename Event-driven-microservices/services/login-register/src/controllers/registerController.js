const bcrypt = require('bcryptjs');
const { User } = require('../db');  // Adjust the path as necessary
console.log('Imported User:', User);

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('register', { message: 'Email and password are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(email, hashedPassword);
        const token = newUser.generateJWT();
        res.render('register', { token });  // Render the register page with the token
    } catch (err) {
        console.error(err);
        res.status(500).render('register', { message: 'Registration failed' });
    }
};
