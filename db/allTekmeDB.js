const Tekma = require('./tekma');

async function getAllTekmasMongoDB(){
let tekmas = await Tekma.find();

return tekmas;
}

module.exports = getAllTekmasMongoDB;