const mongoose = require("mongoose")

const citiesSchema = new mongoose.Schema({
    cityname:{type:String, required:true},
    country:{type:String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:true}
})
const Cities = mongoose.model('cities', citiesSchema) //cities, nombre de la coleccion que va a buscar en la db dependiendo si get o post o lo que sea, y el schema es lo que busca, o empuja o lo que sea 
module.exports = Cities