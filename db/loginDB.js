const User = require('./user');

async function loginMongoDB(username, password){

    //  User.findOn
      let answerForLogin = await User.findOne({username:username, password:password});
      return answerForLogin;
}

module.exports = loginMongoDB;