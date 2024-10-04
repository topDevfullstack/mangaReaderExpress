const User = require('../models/userModel');

class UserService {
  async getAllUsers() {
    console.log(123)
    return User.find();
  }
}

module.exports = new UserService();