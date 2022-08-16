const mongoose = require("mongoose")

const itinerariesSchema = new mongoose.Schema({
    itineraryname:{type:String, required:true},
    username:{type:String, required:true},
    userimage:{type:String, required:true},
    price:{type:String, required:true},
    time:{type:String, require:true},
    hashtags:{type:Array, require:true},
    likes:{type:Array, require:true},
    cities:{type: mongoose.Types.ObjectId , ref:'cities'},
    comments:[{
        comment: {type: String},
        userID: { type: mongoose.Types.ObjectId , ref: 'users'},
        date: { type: Date }
    }],
    activities:[{type: mongoose.Types.ObjectId, ref: 'activities'}]
})
const Itineraries = mongoose.model("itineraries", itinerariesSchema)
module.exports = Itineraries