const User = require('./user');

async function getAllUsersMongoDB(){
    let users = await User.find()
    console.log(users[0]);
    let user0 = users[0];
    let dateAdded = user0.createdAt.toString();
    console.log(dateAdded);
  let array = dateAdded.split('GMT');
  console.log(array);

    return users;
}

module.exports = getAllUsersMongoDB;