const userModel = require('../models/userModel');
const { publishUserProfile } = require('../rabbitmq/publisher');

exports.showUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user }); // Render the EJS template named 'profile'
        await publishUserProfile({ user_id: user.user_id, username: user.username, email: user.email, phone: user.phone, gender: user.gender });

    } catch (error) {
        res.status(500).send('Error retrieving user profile');
    }
};


exports.updateUserProfile = async (req, res) => {
    console.log("Request body:", req.body);
    const { username, email, phone, gender } = req.body || {};
    if (!username) {
        console.log("Username is required");
        return res.status(400).send("Username is required");
    }
    try {
        const { username, email, phone, gender } = req.body || {};
        if (!username || !email || !phone || !gender) {
            return res.status(400).send('Missing required fields');
        }
        const updatedUser = await userModel.updateUser(req.params.userId, { username, email, phone, gender });
        res.redirect(`/profile/${req.params.userId}`);
        await publishUserProfile({ user_id: req.params.userId, username, email, phone, gender });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send('Error updating user profile');
    }
};


exports.editUserProfile = async (req, res) => {
    const userId = req.params.userId;
    const user = await userModel.getUserById(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('editProfile', { user });
};
