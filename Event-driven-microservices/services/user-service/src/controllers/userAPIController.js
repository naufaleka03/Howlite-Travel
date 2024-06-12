const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.json(users);
        await publishUserProfile({ user_id: newUser.user_id, username: newUser.username, email: newUser.email, phone: newUser.phone, gender: newUser.gender });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    console.log(req.body); // Tambahkan log untuk debugging
    try {
        await userModel.updateUser(req.params.id, req.body);
        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};