const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewRemovedTekmaSchema = new Schema
({
removed_tim1 :{
    type:String,
    required:false
},
removed_tim2:{
    type:String,
    required:false
},
removed_kvota:{
    type:Number,
    required:false
},
removed_liga:{
    type:String,
    required:false
},
removed_game:{
    type:String,
    required:false
},
removed_sport:{
    type:String,
    required:false
},
removed_stek:{
    type:Number,
    required:false
},
removed_dateAdded:{
    type:Date,
    required:false
},
removed_dateEnded:{
    type:Date,
    required:false
},
dalijeproslo:{
    type:String,
    required:false
}
},{timestamps:true});

const Removed_Tekma = mongoose.model('Removed_Tekma', NewRemovedTekmaSchema );

module.exports = Removed_Tekma;