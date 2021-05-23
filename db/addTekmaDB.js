const Tekma = require('./tekma');

async function addTekmaMongoDB(objTekma){
          let dateToStart = new Date(objTekma.dateToStart);
          let dateToEnd = new Date(objTekma.dateToEnd);
          objTekma.dateToStart=dateToStart;
          objTekma.dateToEnd=dateToEnd;
      //    console.log(objTekma);                     
        let tekma = new Tekma(objTekma);
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

      tekma.save().then(res=>{
            console.log(res);
         })
}

module.exports = addTekmaMongoDB;