const Removed_Tekma = require('./removed_tekma');


async function prosloMongoDB(id){
    let update ={ dalijeproslo:"proslo"}
    let updateResponse = await Removed_Tekma.findByIdAndUpdate(id, update)  
    return updateResponse;
}
async function nijeMongoDB(id){
    let update ={ dalijeproslo:"nije"}
    let updateResponse = await Removed_Tekma.findByIdAndUpdate(id, update)  
    return updateResponse;
}
async function obrisiRemovedTekmuMongoDB(id){
    let updateResponse = await Removed_Tekma.findByIdAndDelete(id);
    return updateResponse;
}

module.exports.prosloMongoDB = prosloMongoDB;
module.exports.nijeMongoDB = nijeMongoDB;
module.exports.obrisiRemovedTekmuMongoDB = obrisiRemovedTekmuMongoDB;