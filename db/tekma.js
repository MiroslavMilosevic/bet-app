const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewTekmaSchema = new Schema
({
tim1 :{
    type:String,
    required:true
},
tim2:{
    type:String,
    required:true
},
kvota:{
    type:Number,
    required:true
},
liga:{
    type:String,
    required:true
},
game:{
    type:String,
    required:true
},
sport:{
    type:String,
    required:true
},
stek:{
    type:Number,
    required:false
},
dateToStart:{
    type:Date,
    required:false
},
dateToEnd:{
    type:Date,
    required:false
}
},{timestamps:true});

const Tekma = mongoose.model('Tekma', NewTekmaSchema );

module.exports = Tekma;