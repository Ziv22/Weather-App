const mongoose  = require("mongoose")

const Schema    = mongoose.Schema

const cityCheama = new Schema({
    name:           String,
    temprature:     Number, 
    condition:      String, 
    conditionPic:   String,

}) 
const City = mongoose.model("City" , cityCheama)

module.exports = City
