const mongoose =require('mongoose')

// Schema for user
const cand = new mongoose.Schema(
    {
        id:{type : Number, require: true},
        Name: {type :String , required :false},
        DoB: {type : String , required :false},
        Age : {type :Number , required :true},
        Email: {type :String , required :true, unique :true},
        Address: {type :String , required :false},
        Result: {type :String , required :false},
        State: {type :String , required :false},
        Pin :{type :String , required :false}
    },
    {collection : 'Cand-data'}
)

const model = mongoose.model('CandData', cand)

module.exports = model;


