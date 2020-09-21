const   api         = require("./server/routes/api.js"),
        bodyParser  = require("body-parser"),
        express     = require("express"),
        path        = require('path'),
        app         = express(),
        mongoose    = require("mongoose")
        port        = 7777

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',api)

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/CitiesDB' , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
    })



app.listen(process.env.PORT || port, function(){
    console.log(`Server is up and running on port: ${port}`)
})