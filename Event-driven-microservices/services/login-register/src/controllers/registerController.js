exports.register = async (req, res) => {
    try {
        res.render('register');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
