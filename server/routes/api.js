const apiKey    = 'bca373a7153c5d8019d5c18e3c7398b9'
const City      = require("../model/City")
const express   = require("express")
const router    = express.Router()
const axios     = require('axios')

const getUrl = city =>{
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

const getIcon = iconUrl =>{
    return `http://openweathermap.org/img/wn/${iconUrl}@2x.png`
}

router.get("/city/:cityName", async (req,res) => {
    const url = getUrl(req.params.cityName)
    try {
        let weather = await axios.get(url)
        let cityWeather = {
            name:           weather.data.name, 
            temprature:     weather.data.main.temp,
            conditionPic:   getIcon(weather.data.weather[0].icon),
            condition:      weather.data.weather[0].description
        }
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