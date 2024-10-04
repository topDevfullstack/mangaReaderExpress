const User = require('../models/userModel');

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  async getAllUsers() {
    return User.find();
  }

  async getUserById(userId) {
    return User.findById(userId);
  }

  async updateUser(userId, userData) {
    return User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId) {
    return User.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();