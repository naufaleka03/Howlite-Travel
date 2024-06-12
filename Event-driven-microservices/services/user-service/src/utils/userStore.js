let users = []; // This will hold the latest user data received via RabbitMQ

function updateUserStore(userData) {
    users.push(userData);
}

function getUsers() {
    return users;
}

module.exports = { updateUserStore, getUsers };
