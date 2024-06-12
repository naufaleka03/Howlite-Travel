const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');
console.log('Imported User:', User);

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('register', { message: 'Email and password are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(email, hashedPassword);
        res.redirect('/login?success=true');
        console.log('New user created:', newUser);
    } catch (err) {
        console.error(err);
        res.status(500).render('register', { message: 'Registration failed' });
    }
};