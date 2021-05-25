const Removed_Tekma = require('./removed_tekma');


async function prosloMongoDB(id){

    let update ={ dalijeproslo:"proslo"}
    let updateResponse = await Removed_Tekma.findByIdAndUpdate(id, update)  

    return updateResponse;

}

module.exports.prosloMongoDB = prosloMongoDB;