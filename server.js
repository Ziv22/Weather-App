const api           = require("./server/routes/api.js")
const bodyParser    = require("body-parser")
const express       = require("express")
const path          = require('path')
const app           = express()
const port          = 3000

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',api)


app.listen(port, function(){
    console.log(`Server is up and running on port: ${port}`)
})