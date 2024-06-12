const userModel = require('../models/userModel');

exports.showUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user }); // Render the EJS template named 'profile'
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
    const { username, email, phone, gender } = req.body;
    try {
        await userModel.updateUser(userId, { username, email, phone, gender });
        res.redirect(`/profile/${userId}`);
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
