const mongoose  = require("mongoose")
mongoose.connect('mongodb://localhost:27017/CitiesDB' , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
    })

const Schema    = mongoose.Schema

const cityCheama = new Schema({
    name:           String,
    temprature:     Number, 
    condition:      String, 
    conditionPic:   String,
    AddButtonVisibility:     {type:String , default: "added"}
}) 
const City = mongoose.model("City" , cityCheama)

module.exports = City
