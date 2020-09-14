const mongoose  = require("mongoose")
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/CitiesDB' , {
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

}) 
const City = mongoose.model("City" , cityCheama)

module.exports = City
