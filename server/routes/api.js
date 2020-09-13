const   City    = require("../model/City"),
        helpers = require("./api-hrlpers")
        express = require("express"),
        axios   = require('axios'),
        router  = express.Router(),

router.get("/city/:cityName", async (req,res) => {
    const url = helpers.getUrl(req.params.cityName)
    try {
        let weather = await axios.get(url)
        let cityWeather = helpers.generateWeatherData(weather)
        res.send(cityWeather)
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/cities", async (req,res) =>{
    try{
        const cities = await City.find({})
        res.send(cities)
    }
    catch(err){
        res.send(err)
    }
})

router.post("/city" , async (req,res)=>{
    try {
        const city     = new City(req.body)
        const saveCity = await city.save() 
        res.send(saveCity)
    }
    catch(err){
        res.send(err)
    }
})
router.put("/city/:cityName" , async (req,res)=>{
    const cityName = req.params.cityName
    const url = helpers.getUrl(cityName)
    try {
        let weather = await axios.get(url)
        let cityWeather = helpers.generateWeatherData(weather)
        const updatedCity = await City.findOneAndUpdate(cityName ,cityWeather, {new:true})
        res.send(updatedCity)

    }
    catch(err){
        res.send(err)
    }
})

router.delete("/city/:name" , async (req , res) =>{
    try{
        const name        = req.params.name
        const deletedCity = await City.findOneAndDelete({name})
        res.send(deletedCity)
    } 
    catch(err){
        res.send(err)
    }
})
module.exports = router 