const userModel = require('../models/userModel');

exports.showUsersPage = async (req, res) => {
    try {
      console.log('Fetching bookings from database...');
      const users = await userModel.getUsers();
      console.log('Users fetched:', users);
      res.render('profile', { users }); // Render the EJS template with real bookings data
  } catch (error) {
      console.error('Error loading users:', error); // Log the error details
        res.status(500).send('Error loading users');
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
    const { username, email, phone, gender, password } = req.body;
    const userId = req.params.id; // Make sure you are passing the user ID correctly, possibly from a hidden form field or session data
  
    try {
        await userModel.updateUser(userId, { username, email, phone, gender, password });
        res.redirect('/profile'); // Redirect to a confirmation page or back to the profile
    } catch (error) {
        res.status(500).send('Error updating profile');
    }
  };