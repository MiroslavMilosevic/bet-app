const User = require('./user');

async function getAllUsersMongoDB(){
    let users = await User.find()
    return users;
}

module.exports = getAllUsersMongoDB;