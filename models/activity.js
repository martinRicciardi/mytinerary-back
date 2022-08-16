const mongoose = require("mongoose")

const activitiesSchema = new mongoose.Schema({
    activity:{type:String, required:true},
    activityphoto:{type:String, required:true},
    itineraries:{type: mongoose.Types.ObjectId, ref:"itineraries"}
})
const Activities = mongoose.model("activities", activitiesSchema)
module.exports = Activities