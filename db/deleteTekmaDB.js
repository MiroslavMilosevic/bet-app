const Tekma = require('./tekma');
const Removed_Tekma = require('./removed_tekma');

async function logDeletedTekma(deletedTekma) {
    let removed_tekma = new Removed_Tekma({
        removed_tim1: deletedTekma.tim1,
        removed_tim2: deletedTekma.tim2,
        removed_kvota: deletedTekma.kvota,
        removed_liga: deletedTekma.liga,
        removed_game: deletedTekma.game,
        removed_sport: deletedTekma.sport,
        removed_stek: deletedTekma.stek,
        removed_dateAdded: deletedTekma.createdAt,
        removed_dateEnded: deletedTekma.dateToEnd,
        dalijeproslo: "neodluceno"
    })

    logDeletedTekmaResponse = await removed_tekma.save()

    return logDeletedTekmaResponse;
}


async function deleteTekmaMongoDB(id) {

    let tekmaDeleteResponse = await Tekma.findByIdAndDelete(id);
    let logDeletedTekmaResponse = await logDeletedTekma(tekmaDeleteResponse);
    return logDeletedTekmaResponse;
}

module.exports = deleteTekmaMongoDB;