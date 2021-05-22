const User = require('./user');

async function deleteUser(id){

let deleteUserResponse = await User.findByIdAndDelete(id);

//console.log(deleteUserResponse);
return deleteUserResponse;

}

module.exports = deleteUser;