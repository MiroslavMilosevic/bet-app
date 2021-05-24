const Tekma = require('./tekma');

async function addTekmaMongoDB(objTekma) {
  let dateToStart = new Date(objTekma.dateToStart);
  let dateToEnd = new Date(objTekma.dateToEnd);
  objTekma.dateToStart = dateToStart;
  objTekma.dateToEnd = dateToEnd;

  if (!isNaN(objTekma.kvota) && objTekma.dateToStart instanceof Date && isFinite(objTekma.dateToStart) &&
    objTekma.dateToEnd instanceof Date && isFinite(objTekma.dateToEnd)) {

    let tekma = new Tekma(objTekma);

    let responseAddTekma = await tekma.save();
    return responseAddTekma;

  } else {

    return false;

  }
  //  let tekma = new Tekma({
  //      tim1:"Chelsea",
  //      tim2:"Totenham",
  //      kvota:5.55,
  //      liga:"Premier",
  //      game:"Over 1.5",
  //      sport:"soccer",
  //      stek:null,
  //      dateToStart:null,
  //      dateToEnd:null
  //  })

  // let returnAddTekma = await tekma.save();
  // return returnAddTekma;

}

module.exports = addTekmaMongoDB;