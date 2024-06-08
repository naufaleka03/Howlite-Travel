const userModel = require('../models/userModel');

exports.showUsersPage = async (req, res) => {
    try {
        // const users = await userModel.getUsers();
        // res.render('userList', { users }); // Render the EJS template with users data
        // Mock data for users
        const users = [
            {
              username: 'wildan fauzan ramdana',
              email: 'wildan@gmail.com',
              phoneNumber: '081234567890',
              gender: 'male',
              password: 'wildan123',
            },
            
        ];
        
        res.render('editProfile', { users }); // Render the EJS template with mock users data
    } catch (error) {
        res.status(500).send('Error loading users');
    }
};
