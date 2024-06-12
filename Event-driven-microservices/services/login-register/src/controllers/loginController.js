const { User, Token } = require('../models/userModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('login', { message: 'Email and password are required' });
    }
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).render('login', { message: 'Login failed' });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).render('login', { message: 'Login failed' });
        }
        const token = user.generateJWT();
        
        // Store the token in the database with the user's ID
        await Token.storeToken(user.id, token);  // user.id is the ID from the users table

        // Send the token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, secure: true }); // Use secure: true if you are using HTTPS
        res.redirect('/dashboard'); // Redirect to a secure page
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { message: 'Server error' });
    }
};