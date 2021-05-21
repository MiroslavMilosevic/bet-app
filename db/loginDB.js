const User = require('./user');

async function loginMongoDB(username, password){

    //  User.findOn
      let answerForLogin = await User.findOne({username:username})
 //     console.log(answerForLogin);
      return answerForLogin;
}

module.exports = loginMongoDB;