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

exports.showEditUserPage = async (req, res) => {
    try {
      console.log('Fetching bookings from database...');
      const users = await userModel.getUsers();
      console.log('Users fetched:', users);
      res.render('editProfile', { users }); // Render the EJS template with real bookings data
  } catch (error) {
      console.error('Error loading users:', error); // Log the error details
      res.status(500).send('Error loading users');
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
        await userModel.updateUser(userId, { username, email, phone, gender });
        res.redirect(`/profile/${userId}`);
        await publishUserProfile({ user_id: userId, username, email, phone, gender });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send('Error updating user profile');
    }
};

exports.updateUser = async (req, res) => {
    const userData = req.body;
    try {
        await userModel.updateUser(userData);
        res.redirect('/profile');
        await publishUserProfile({ user_id: userData.user_id, ...userData });
    } catch (error) {
        res.status(500).send('Error updating user data');
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
