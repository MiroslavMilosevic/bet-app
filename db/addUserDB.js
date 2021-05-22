const User = require('./user');

async function addUserMongoDB(username, password, description){

         
    const user = new User
    ({
    username:username,
    password:password,
    description: description
    });

     let saveResponse = await user.save();
     let usersAfterSave = await User.find();
    
     return usersAfterSave;
    
}

module.exports = addUserMongoDB;