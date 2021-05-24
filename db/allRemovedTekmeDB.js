const Removed_Tekma = require('./removed_tekma');


async function getAllRemovedTekmeMongoDB(){

    let allRemovedTekme = await Removed_Tekma.find()
    return allRemovedTekme;
}

module.exports = getAllRemovedTekmeMongoDB;